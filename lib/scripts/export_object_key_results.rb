require 'optparse'
require 'csv'

class ExportObjectKeyResuts
  def self.create_csv_value(organization, period_from, period_to)
    export_data = get_export_data(organization, period_from, period_to)

    if export_data.count.zero?
      return
    end

    user_grouped = export_data.group_by {|item| item['key_result_owner_id']}

    bom = "\uFEFF"
    headers = ['','ユーザー名','メールアドレス', 'OKR']
    csv_options = {
      encoding: 'UTF-8',
      write_headers: true,
      headers: headers,
      force_quotes: true,
    }

    CSV.generate(bom, csv_options) do |csv|
      user_grouped.each_with_index do |(key, source), index|
        row = RecordRow.new(source)
        csv << [index + 1, row.user_name, row.email, row.get_okr_column_value]
      end
    end
  end

  def self.get_export_data(organization, period_from, period_to)
      connection = ActiveRecord::Base.connection

      # sanitize
      org_name = connection.quote(organization)
      from = connection.quote(period_from)
      to = connection.quote(period_to)

      sql = <<~EOS
        select 
          u.id as key_result_owner_id
          , u.email as key_result_owner_email
          , u.last_name as key_result_owner_last_name
          , u.first_name as key_result_owner_first_name
          , period.month_start as okr_start_period
          , period.month_end as okr_end_period
          , kr.name as key_result_name
          , kr.progress_rate as key_result_progress
          , kr.target_value
          , kr.actual_value
          , kr.expired_date
          , o.id as objective_id
          , o.name as objective_name
          , o.progress_rate as objective_progress
          , ou.id as objective_owner_id
          , ou.last_name as objective_owner_last_name
          , ou.first_name as objective_owner_first_name
          , parent_kr.id as parent_key_result_id
          , parent_kr.name as parent_key_result_name
          , parent_kr.progress_rate as parent_key_result_progress
          , parent_kr.target_value as parent_key_result_target_value
          , parent_kr.actual_value as parent_key_result_actual_value
          , parent_kr_user.id as parent_key_result_owner_id
          , parent_kr_user.last_name as parent_key_result_owner_last_name
          , parent_kr_user.first_name as parent_key_result_owner_first_name
        from organizations as org
          inner join organization_members as m
            on org.id = m.organization_id
          inner join users as u
            on m.user_id = u.id
          inner join key_result_members as krm
            on krm.user_id = u.id
          inner join key_results as kr
            on kr.id = krm.key_result_id
          inner join okr_periods as period
            on period.id = kr.okr_period_id
            and period.organization_id = org.id
          inner join objectives as o
            on o.id = kr.objective_id
          inner join objective_members as om
            on om.objective_id = o.id
          inner join users as ou
            on ou.id = om.user_id
          inner join key_results as parent_kr
            on parent_kr.id = o.parent_key_result_id
          inner join key_result_members as parent_kr_member
            on parent_kr_member.key_result_id = parent_kr.id
          inner join users as parent_kr_user
            on parent_kr_member.user_id = parent_kr_user.id
        where org.name = #{org_name}
         and period.month_start >= #{from}
         and period.month_end <= #{to}
        order by u.objective_order, o.key_result_order;
      EOS

      connection.select_all(sql).to_hash
  end

  private_class_method :get_export_data

  class RecordRow
    attr_reader :user_name, :email

    def initialize(source)
      first_row = source.first

      @key_result_owner_id = first_row['key_result_owner_id']
      @user_name = get_full_name(first_row['key_result_owner_last_name'], first_row['key_result_owner_first_name'])
      @email = first_row['key_result_owner_email']
      @okr_start_period = first_row['okr_start_period']
      @okr_end_period = first_row['okr_end_period']
      @okrs = to_okrs(source)
    end

    def get_okr_column_value()
      result = "【OKR 期間: #{@okr_start_period} - #{@okr_end_period}】\n\n"

      @okrs.each_with_index do |okr, index|
        parent_kr = okr[:parent_kr]
        objective = okr[:objective]
        key_results = okr[:key_results]

        parent_kr_value = get_parent_kr_value(parent_kr)
        objective_value = get_objective_value(objective)

        result += <<~"EOS"
          ┌ 上位 KR: #{parent_kr_value}
          O#{index + 1}: #{objective_value}
        EOS

        count = key_results.count
        key_results.each_with_index do |key_result, index|
          tree_symbol = index + 1 == count ? '└' : '├'
          
          rate = parse_zero_if_nil(get_key_result_rate(key_result[:progress], key_result[:target_value], key_result[:actual_value]))

          result += <<~"EOS"
            #{tree_symbol}KR#{index + 1}: #{key_result[:name]} [#{key_result[:progress]}%, #{rate}, 目標値#{key_result[:target_value]}, 実績値#{key_result[:actual_value]}, 期限#{key_result[:expired_date]}]
          EOS
        end

        if index + 1 != @okrs.count
          result += "\n"
        end
      end

      result
    end

    private

    def to_okrs(source)
      okrs = []

      objective_grouped = source.group_by {|item| item['objective_id']}

      objective_grouped.each do |key, record|
        first_record = record.first

        parent_kr = first_record['parent_key_result_id'].nil? ? nil : {
          name: first_record['parent_key_result_name'],
          progress: first_record['parent_key_result_progress'],
          target_value: first_record['parent_key_result_target_value'],
          actual_value: first_record['parent_key_result_actual_value'],
          owner_id: first_record['parent_key_result_owner_id'],
          owner: get_full_name(first_record['parent_key_result_owner_last_name'], first_record['parent_key_result_owner_first_name'])
        }
        
        objective = {
          name: first_record['objective_name'],
          progress: first_record['objective_progress'],
          owner_id: first_record['objective_owner_id'],
          owner: get_full_name(first_record['objective_owner_last_name'], first_record['objective_owner_first_name'])
        }

        key_results = []
        record.each do |record|
          key_results.push({
            name: record['key_result_name'],
            progress: record['key_result_progress'],
            owner: @user_name,
            target_value: record['target_value'],
            actual_value: record['actual_value'],
            expired_date: record['expired_date']
          })
        end

        okrs.push({
          parent_kr: parent_kr,
          objective: objective,
          key_results: key_results
        })
      end

      okrs
    end

    def get_full_name(last_name, first_name)
      "#{last_name} #{first_name}"
    end

    def parse_zero_if_nil(value)
      value.nil? ? 0 : value
    end

    def get_parent_kr_value(parent_kr)
      if parent_kr.nil?
        return 'なし'
      end
      
      rate = parse_zero_if_nil(get_key_result_rate(parent_kr[:progress], parent_kr[:target_value], parent_kr[:actual_value]))

      parent_kr_format = "#{parent_kr[:name]} [#{rate}%, #{parent_kr[:owner]}]"

      if parent_kr[:owner_id] != @key_result_owner_id
        return "(#{parent_kr_format})"
      end

      parent_kr_format
    end

    def get_objective_value(objective)
      rate = parse_zero_if_nil(objective[:progress])

      objective_format = "#{objective[:name]} [#{rate}%, #{objective[:owner]}]"
      
      if objective[:owner_id] != @key_result_owner_id 
        return "(#{objective_format})"
      end

      objective_format
    end

    def get_key_result_rate(progress, target_value, actual_value)
      if progress.nil?
        if target_value.present? && actual_value.present? && target_value > 0
          return (actual_value * 100 / target_value).round
        end
      end
      progress
    end
  end

  private_constant :RecordRow
end

options = {}

parsed = OptionParser.new { |opt|
  opt.on('-o', '--organization', 'OKR出力対象組織を指定します。') 
  opt.on('-f', '--period-from', '出力対象のOKR開始時期を指定します。')
  opt.on('-t', '--period-to', '出力対象のOKR終了時期を指定します。')

}.parse(ARGV, into: options)

puts "以下の対象を出力します。 organization: #{parsed[0]}, period-from: #{parsed[1]}, period-to: #{parsed[2]}"

csv_value = ExportObjectKeyResuts.create_csv_value(parsed[0], parsed[1], parsed[2])

if csv_value.nil?
  puts "出力対象が存在しませんでした。処理を終了します。"
  return
end

file_name = "#{parsed[0]}_okr_#{parsed[1]}-#{parsed[2]}.csv"
path = Dir.pwd + '/' + file_name
    
File.open(path, 'w') { |file| file.write(csv_value) }

puts "#{path} に出力完了しました。"
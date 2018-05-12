# frozen_string_literal: true

require 'date'
require 'optparse'
require 'csv'

# DataAccessLayer
class ExportObjectKeyResultsDataAccessor
  def self.all_organizations
    Organization.order(:id).all
  end

  def self.get_okr_periods(organization_id)
    org = Organization.includes(:okr_periods).find(organization_id)
    org.okr_periods
  end

  def self.get_export_data(organization_id, period_id)
    connection = ActiveRecord::Base.connection

    # sanitize
    organization_id = connection.quote(organization_id)

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
        , kr.value_unit
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
        left outer join key_result_members as krm
          on krm.user_id = u.id
          and krm.role = 0 #owner
        left outer join key_results as kr
          on kr.id = krm.key_result_id
        left outer join okr_periods as period
          on period.id = kr.okr_period_id
          and period.organization_id = org.id
        left outer join objectives as o
          on o.id = kr.objective_id
        left outer join objective_members as om
          on om.objective_id = o.id
        left outer join users as ou
          on ou.id = om.user_id
        left outer join key_results as parent_kr
          on parent_kr.id = o.parent_key_result_id
        left outer join key_result_members as parent_kr_member
          on parent_kr_member.key_result_id = parent_kr.id
          and parent_kr_member.role = 0 #owner
        left outer join users as parent_kr_user
          on parent_kr_member.user_id = parent_kr_user.id
      where org.id = #{organization_id}
       and period.id = #{period_id}
      order by u.id, u.objective_order, o.key_result_order;
    EOS

    connection.select_all(sql).to_hash
  end
end

# Model
class ExportObjectKeyResultsCsvRow
  attr_reader :user_name, :email

  def initialize(source)
    first_row = source.first

    @key_result_owner_id = first_row['key_result_owner_id']
    @user_name = to_full_name(first_row['key_result_owner_last_name'], first_row['key_result_owner_first_name'])
    @email = first_row['key_result_owner_email']
    @okr_start_period = first_row['okr_start_period']
    @okr_end_period = first_row['okr_end_period']
    @okrs = to_okrs(source)
  end

  def okr_column_value
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

      result += get_key_results_value(key_results)

      result += "\n" if index + 1 != @okrs.count
    end

    result
  end

  private

  def to_okrs(source)
    okrs = []
    objective_grouped = source.group_by {|item| item['objective_id']}

    objective_grouped.each do |_, records|
      first = records.first

      if first['parent_key_result_id'].nil?
        parent_kr = nil
      else
        pkr_owner = to_full_name(first['parent_key_result_owner_last_name'], first['parent_key_result_owner_first_name'])
        parent_kr = {
            name: first['parent_key_result_name'],
            progress: first['parent_key_result_progress'],
            target_value: first['parent_key_result_target_value'],
            actual_value: first['parent_key_result_actual_value'],
            owner_id: first['parent_key_result_owner_id'],
            owner: pkr_owner
        }
      end

      objective_owner = to_full_name(first['objective_owner_last_name'], first['objective_owner_first_name'])
      objective = {
          name: first['objective_name'],
          progress: first['objective_progress'],
          owner_id: first['objective_owner_id'],
          owner: objective_owner
      }

      key_results = []
      records.each do |record|
        key_results.push(
            name: record['key_result_name'],
            progress: record['key_result_progress'],
            owner: @user_name,
            target_value: record['target_value'],
            actual_value: record['actual_value'],
            value_unit: record['value_unit'],
            expired_date: record['expired_date']
        )
      end

      okrs.push(
          parent_kr: parent_kr,
          objective: objective,
          key_results: key_results
      )
    end

    okrs
  end

  def to_full_name(last_name, first_name)
    "#{last_name} #{first_name}"
  end

  def parse_zero_if_nil(value)
    value.nil? ? 0 : value
  end

  def get_parent_kr_value(parent_kr)
    return 'なし' if parent_kr.nil?

    kr_rate = get_key_result_rate(parent_kr[:progress], parent_kr[:target_value], parent_kr[:actual_value])
    rate = parse_zero_if_nil(kr_rate)

    parent_kr_format = "#{parent_kr[:name]} [#{rate}%, #{parent_kr[:owner]}]"

    return "(#{parent_kr_format})" if parent_kr[:owner_id] != @key_result_owner_id

    parent_kr_format
  end

  def get_objective_value(objective)
    rate = parse_zero_if_nil(objective[:progress])

    objective_format = "#{objective[:name]} [#{rate}%, #{objective[:owner]}]"

    return "(#{objective_format})" if objective[:owner_id] != @key_result_owner_id

    objective_format
  end

  def get_key_result_rate(progress, target_value, actual_value)
    if progress.nil? && target_value.present? && actual_value.present? && target_value.positive?
      return (actual_value * 100 / target_value).round
    end

    progress
  end

  def get_key_results_value(key_results)
    key_results_value = ''
    count = key_results.count

    key_results.each_with_index do |key_result, index|
      tree_symbol = index + 1 == count ? '└' : '├'

      kr_rate = get_key_result_rate(key_result[:progress], key_result[:target_value], key_result[:actual_value])
      rate = parse_zero_if_nil(kr_rate)

      target_actual = ''
      target_actual += " 目標値#{key_result[:target_value]}#{key_result[:value_unit]}," if key_result[:target_value].present?
      target_actual += " 実績値#{key_result[:actual_value]}#{key_result[:value_unit]}," if key_result[:actual_value].present?

      key_results_value += <<~"EOS"
        #{tree_symbol}KR#{index + 1}: #{key_result[:name]} [#{rate}%, #{@user_name},#{target_actual} 期限#{key_result[:expired_date]}]
      EOS
    end

    key_results_value
  end
end

# ServiceLayer
class ExportObjectKeyResultsService
  def self.create_csv_value(organization_id, period_id)
    export_data = ExportObjectKeyResultsDataAccessor.get_export_data(organization_id, period_id)

    return if export_data.count.zero?

    user_grouped = export_data.group_by {|item| item['key_result_owner_id']}

    headers = ['', 'ユーザー名', 'メールアドレス', 'OKR']
    csv_options = {
        encoding: 'UTF-8',
        write_headers: true,
        headers: headers,
        force_quotes: true
    }

    CSV.generate(csv_options) do |csv|
      user_grouped.each_with_index do |(_, source), index|
        row = ExportObjectKeyResultsCsvRow.new(source)
        csv << [index + 1, row.user_name, row.email, row.okr_column_value]
      end
    end
  end
end

# execute export
puts '出力対象の組織を選択します。'
organizations = ExportObjectKeyResultsDataAccessor.all_organizations

organizations.each do |org|
  puts "Id:#{org.id}, 組織名:#{org.name}"
end
puts '上記の中から組織から出力する組織のIdを選択してください。'
print '組織のId:'
org_id = gets.chomp!

org = organizations.find {|x| x.id.to_s == org_id}
if org.nil?
  puts '入力したIdの組織が存在しないので処理を終了します。'
  return
end

puts '出力対象の期間を選択します。'
okr_periods = ExportObjectKeyResultsDataAccessor.get_okr_periods(org.id)

okr_periods.each do |period|
  puts "Id:#{period.id}, 期間名:#{period.name}, 開始:#{period.month_start}, 終了#{period.month_end}"
end

puts '以下の期間から出力する期間のIdを指定してください。'
print '期間のId:'
period_id = gets.chomp!

period = okr_periods.find {|x| x.id.to_s == period_id}

if period.nil?
  puts '対象の期間が存在しないので処理を終了します。'
  return
end

puts "以下の対象を出力します。 organization: #{org.name}, period_name: #{period.name}"

csv_value = ExportObjectKeyResultsService.create_csv_value(org.id, period.id)

file_name = "#{org.name}_okr_#{period.month_start}-#{period.month_end}.csv"
path = Dir.pwd + '/' + file_name

File.open(path, 'w') do |file|
  bom = "\uFEFF"
  file.write(bom)
  file.write(csv_value)
end

puts "#{path} に出力完了しました。"

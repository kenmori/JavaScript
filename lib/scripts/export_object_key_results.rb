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

  def self.find_okr_period(period_id)
    OkrPeriod.find(period_id)
  end

  def self.get_export_data(organization_id, period_id)
    connection = ActiveRecord::Base.connection

    sql = <<~EOS
      select
        u.id as user_id
        , u.email as user_email
        , u.last_name as user_last_name
        , u.first_name as user_first_name
        , o_order.list as o_order
        , own_key_results.kr_id as kr_kr_id
        , own_key_results.kr_name as kr_kr_name
        , own_key_results.kr_progress as kr_kr_progress
        , own_key_results.target_value as kr_target_value
        , own_key_results.actual_value as kr_actual_value
        , own_key_results.value_unit as kr_value_unit
        , own_key_results.expired_date as kr_expired_date
        , own_key_results.o_id as kr_o_id
        , own_key_results.o_name as kr_o_name
        , own_key_results.o_progress as kr_o_progress
        , own_key_results.o_kr_order as kr_o_kr_order
        , own_key_results.ou_id as kr_ou_id
        , own_key_results.ou_last_name as kr_ou_last_name
        , own_key_results.ou_first_name as kr_ou_first_name
        , own_key_results.p_kr_id as kr_p_kr_id
        , own_key_results.p_kr_name as kr_p_kr_name
        , own_key_results.p_kr_progress as kr_p_kr_progress
        , own_key_results.p_kr_target_value as kr_p_kr_target_value
        , own_key_results.p_kr_actual_value as kr_p_kr_actual_value
        , own_key_results.p_kr_user_id as kr_p_kr_user_id
        , own_key_results.p_kr_user_last_name as kr_p_kr_last_name
        , own_key_results.p_kr_user_first_name as kr_p_kr_first_name
        , own_objectives.o_id as o_o_id
        , own_objectives.o_name as o_o_name
        , own_objectives.o_progress as o_o_progress
        , own_objectives.ou_id as o_ou_id
        , own_objectives.ou_last_name as o_ou_last_name
        , own_objectives.ou_first_name as o_ou_first_name
        , own_objectives.p_kr_id as o_p_kr_id
        , own_objectives.p_kr_name as o_p_kr_name
        , own_objectives.p_kr_progress as o_p_kr_progress
        , own_objectives.p_kr_target_value as o_p_kr_target_value
        , own_objectives.p_kr_actual_value as o_p_kr_actual_value
        , own_objectives.p_kr_user_id as o_p_kr_user_id
        , own_objectives.p_kr_user_last_name as o_p_kr_user_last_name
        , own_objectives.p_kr_user_first_name as o_p_kr_user_first_name
        , case when own_key_results.o_id is null then
            case when own_key_results.kr_id is null then own_objectives.o_id
            else own_key_results.kr_id
            end
          else own_key_results.o_id
          end as record_order_key
      from organizations as org
        inner join organization_members as m
          on org.id = m.organization_id
        inner join users as u
          on m.user_id = u.id
        left join objective_orders as o_order
          on o_order.user_id = u.id
          and o_order.okr_period_id = #{period_id}
        left outer join (
           select
             krm.user_id as kr_user_id
             , kr.okr_period_id
             , kr.id as kr_id
             , kr.name as kr_name
             , kr.progress_rate as kr_progress
             , kr.target_value
             , kr.actual_value
             , kr.value_unit
             , kr.expired_date
             , o.id as o_id
             , o.key_result_order
             , o.name as o_name
             , o.progress_rate as o_progress
             , o.key_result_order as o_kr_order
             , ou.id as ou_id
             , ou.last_name as ou_last_name
             , ou.first_name as ou_first_name
             , parent_kr.id as p_kr_id
             , parent_kr.name as p_kr_name
             , parent_kr.progress_rate as p_kr_progress
             , parent_kr.target_value as p_kr_target_value
             , parent_kr.actual_value as p_kr_actual_value
             , parent_kr_user.id as p_kr_user_id
             , parent_kr_user.last_name as p_kr_user_last_name
             , parent_kr_user.first_name as p_kr_user_first_name
           from key_results as kr
             inner join key_result_members as krm
               on kr.id = krm.key_result_id
               and krm.role = 0 -- owner
               and kr.okr_period_id = #{period_id}
             inner join objectives o
               on o.id = kr.objective_id
               and o.okr_period_id = kr.okr_period_id
             inner join objective_members as om
               on om.objective_id = o.id
               and om.role = 0 -- owner
             inner join users as ou
               on ou.id = om.user_id
             left outer join key_results as parent_kr
               on parent_kr.id = o.parent_key_result_id
               and parent_kr.okr_period_id = o.okr_period_id
             left outer join key_result_members as parent_kr_member
               on parent_kr_member.key_result_id = parent_kr.id
               and parent_kr_member.role = 0 -- #owner
             left outer join users as parent_kr_user
               on parent_kr_member.user_id = parent_kr_user.id
        ) as own_key_results
          on own_key_results.kr_user_id = u.id
        left outer join (
           select
             oo.id as o_id
             , oo.okr_period_id
             , oo.key_result_order
             , oo.name as o_name
             , oo.progress_rate  as o_progress
             , oou.id as ou_id
             , oou.last_name as ou_last_name
             , oou.first_name as ou_first_name
             , o_parent_kr.id as p_kr_id
             , o_parent_kr.name as p_kr_name
             , o_parent_kr.progress_rate as p_kr_progress
             , o_parent_kr.target_value as p_kr_target_value
             , o_parent_kr.actual_value as p_kr_actual_value
             , o_parent_kr_user.id as p_kr_user_id
             , o_parent_kr_user.last_name as p_kr_user_last_name
             , o_parent_kr_user.first_name as p_kr_user_first_name
           from objectives as oo
             inner join objective_members as oom
               on oom.objective_id = oo.id
               and oom.role = 0 -- owner
               and oo.okr_period_id = #{period_id}
             inner join users as oou
               on oou.id = oom.user_id
             left outer join key_results as o_parent_kr
               on o_parent_kr.id = oo.parent_key_result_id
               and o_parent_kr.okr_period_id = oo.okr_period_id
             left outer join key_result_members as o_parent_kr_member
               on o_parent_kr_member.key_result_id = o_parent_kr.id
               and o_parent_kr_member.role = 0 -- #owner
             left outer join users as o_parent_kr_user
               on o_parent_kr_member.user_id = o_parent_kr_user.id
        ) as own_objectives
          on own_objectives.ou_id = u.id
      where org.id = #{organization_id}
      order by u.id, record_order_key;
    EOS

    connection.select_all(sql).to_hash
  end
end

# Model
class ExportObjectKeyResultsCsvRow
  attr_reader :user_name, :email

  def initialize(source, okr_period)
    first = source.first

    @user_id = first['user_id']
    @user_name = to_full_name(first['user_last_name'], first['user_first_name'])
    @email = first['user_email']
    @okr_start_period = okr_period.month_start
    @okr_end_period = okr_period.month_end
    @okrs = to_objective_key_results(source)
  end

  def okr_column_value
    result = "【OKR 期間: #{@okr_start_period} - #{@okr_end_period}】\n\n"

    @okrs.each_with_index do |okr, index|
      parent_kr = okr[:parent_kr]
      objective = okr[:objective]
      key_results = okr[:key_results]

      objective_value = get_objective_value(objective)

      unless parent_kr.nil?
        parent_kr_value = get_parent_kr_value(parent_kr)
        result += "┌ 上位 KR: #{parent_kr_value}\n"
      end

      result += "O#{index + 1}: #{objective_value}\n"
      result += get_key_results_value(key_results)
      result += "\n" if index + 1 != @okrs.count
    end

    result
  end

  def has_okr?
    !@okrs.empty?
  end

  private

  def to_objective_key_results(source)
    okr_trees_exists_key_results = to_okr_trees_exists_key_results(source)

    treed_objective_ids = okr_trees_exists_key_results
                              .reject {|item| item[:objective].nil?}
                              .map {|item| item[:objective][:id]}

    ok_trees = okr_trees_exists_key_results.concat(to_okr_trees_objective_only(source, treed_objective_ids))

    unless source.first['o_order'].nil?
      o_order = source.first['o_order'].split(',').map {|i| i.delete('[]"\\\\')}
      sorted = []

      o_order.each do |id|
        o = ok_trees.find {|i| i[:objective][:id].to_s == id}
        sorted.push(o) unless o.nil?
      end

      ok_trees = sorted
    end

    ok_trees
  end

  # 自分が責任者の KR をまとめて OKRツリーにする
  def to_okr_trees_exists_key_results(source)
    # O を持つ KR を Tree にする
    okr_tree = to_okr_trees_exists_objective(source)

    # O の無い KR を Tree にする
    no_objective_krs = source.select {|i| !i['kr_kr_id'].nil? && i['kr_o_id'].nil? && i['o_o_id'].nil?}
    no_objective_key_results = no_objective_krs.map do |record|
      {
          parent_kr: nil,
          objective: {
              id: record['kr_o_id'],
              name: record['kr_o_name'],
              progress: record['kr_o_progress'],
              owner_id: record['kr_ou_id'],
              owner: to_full_name(record['kr_ou_last_name'], record['kr_ou_first_name'])
          },
          key_results: [{
                            name: record['kr_kr_name'],
                            progress: record['kr_kr_progress'],
                            owner: @user_name,
                            target_value: record['kr_target_value'],
                            actual_value: record['kr_actual_value'],
                            value_unit: record['kr_value_unit'],
                            expired_date: record['kr_expired_date']
                        }]
      }
    end

    okr_tree.concat(no_objective_key_results)
  end

  def to_okr_trees_exists_objective(source)
    kr_o_grouped = source.reject {|i| i['kr_o_id'].nil?}.group_by {|i| i['kr_o_id']}

    return [] if kr_o_grouped.empty?

    results = []

    kr_o_grouped.each do |_, records|
      first = records.first

      parent_kr = if first['kr_p_kr_id'].nil?
                    nil
                  else
                    {
                        name: first['kr_p_kr_name'],
                        progress: first['kr_p_kr_progress'],
                        target_value: first['kr_p_kr_target_value'],
                        actual_value: first['kr_p_kr_actual_value'],
                        owner_id: first['kr_p_kr_user_id'],
                        owner: to_full_name(first['kr_p_kr_last_name'], first['kr_p_kr_first_name'])
                    }
                  end

      objective = {
          id: first['kr_o_id'],
          name: first['kr_o_name'],
          progress: first['kr_o_progress'],
          owner_id: first['kr_ou_id'],
          owner: to_full_name(first['kr_ou_last_name'], first['kr_ou_first_name'])
      }

      kr_source = records.uniq {|i| i['kr_kr_id']}

      unless first['kr_o_kr_order'].nil?
        kr_order = first['kr_o_kr_order'].split(',').map {|i| i.delete('[]"\\\\')}
        sorted = []

        kr_order.each do |id|
          kr = kr_source.find {|i| i['kr_kr_id'].to_s == id}
          sorted.push(kr) unless kr.nil?
        end

        kr_source = sorted
      end

      key_results = kr_source.map do |record|
        {
            name: record['kr_kr_name'],
            progress: record['kr_kr_progress'],
            owner: @user_name,
            target_value: record['kr_target_value'],
            actual_value: record['kr_actual_value'],
            value_unit: record['kr_value_unit'],
            expired_date: record['kr_expired_date']
        }
      end

      results.push(
          parent_kr: parent_kr,
          objective: objective,
          key_results: key_results
      )
    end

    results
  end

  # 自分が責任者のKRが存在しない O をまとめて OKRツリーにする
  def to_okr_trees_objective_only(source, treed_objective_ids)
    objective_only = source.reject do |i|
      i['o_o_id'].nil? || treed_objective_ids.include?(i['o_o_id'])
    end

    objective_only.uniq {|i| i['o_o_id']}.map do |record|
      parent_kr = if record['o_p_kr_id'].nil?
                    nil
                  else
                    {
                        name: record['o_p_kr_name'],
                        progress: record['o_p_kr_progress'],
                        target_value: record['o_p_kr_target_value'],
                        actual_value: record['o_p_kr_actual_value'],
                        owner_id: record['o_p_kr_user_id'],
                        owner: to_full_name(record['o_p_kr_user_last_name'], record['o_p_kr_user_first_name'])
                    }
                  end

      objective = {
          id: record['o_o_id'],
          name: record['o_o_name'],
          progress: record['o_o_progress'],
          owner_id: record['o_ou_id'],
          owner: to_full_name(record['o_ou_last_name'], record['o_ou_first_name'])
      }

      {
          parent_kr: parent_kr,
          objective: objective,
          key_results: []
      }
    end
  end

  def to_full_name(last_name, first_name)
    "#{last_name} #{first_name}"
  end

  def get_parent_kr_value(parent_kr)
    progress_rate = parent_kr[:progress].nil? ? 0 : parent_kr[:progress]
    achievement_rate = get_achievement_rate(parent_kr[:target_value], parent_kr[:actual_value])

    rate = get_key_result_rate_value(achievement_rate, progress_rate)

    parent_kr_format = "#{parent_kr[:name]} [#{rate}, #{parent_kr[:owner]}]"

    return "(#{parent_kr_format})" if parent_kr[:owner_id] != @user_id

    parent_kr_format
  end

  def get_objective_value(objective)
    progress = objective[:progress]
    rate = progress.nil? ? 0 : progress

    objective_format = "#{objective[:name]} [#{rate.to_i}%, #{objective[:owner]}]"

    return "(#{objective_format})" if objective[:owner_id] != @user_id

    objective_format
  end

  def get_achievement_rate(target_value, actual_value)
    if target_value.present? && actual_value.present? && target_value.positive?
      (actual_value * 100 / target_value).round
    end
  end

  def get_key_result_rate_value(achievement_rate, progress_rate)
    if achievement_rate.nil? || progress_rate == achievement_rate
      "#{progress_rate.to_i}%"
    else
      "#{progress_rate.to_i}% (達成率#{achievement_rate.to_i}%)"
    end
  end

  def get_key_results_value(key_results)
    key_results_value = ''
    count = key_results.count

    return key_results_value if count.zero?

    key_results.each_with_index do |key_result, index|
      tree_symbol = index + 1 == count ? '└' : '├'
      target_value = key_result[:target_value]
      actual_value = key_result[:actual_value]
      value_unit = key_result[:value_unit]

      progress_rate = key_result[:progress].nil? ? 0 : key_result[:progress]
      achievement_rate = get_achievement_rate(target_value, actual_value)
      rate = get_key_result_rate_value(achievement_rate, progress_rate)

      target_actual = ''
      target_actual += " 目標値#{target_value.to_i}#{value_unit}," if target_value.present?
      unless target_value.nil?
        value = actual_value.nil? ? '-' : "#{actual_value.to_i}#{value_unit}"
        target_actual += " 実績値#{value},"
      end

      key_results_value += <<~"EOS"
        #{tree_symbol}KR#{index + 1}: #{key_result[:name]} [#{rate}, #{@user_name},#{target_actual} 期限#{key_result[:expired_date]}]
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

    user_grouped = export_data.group_by {|item| item['user_id']}

    okr_period = ExportObjectKeyResultsDataAccessor.find_okr_period(period_id)

    headers = ['', 'ユーザー名', 'メールアドレス', 'OKR']
    csv_options = {
        encoding: 'UTF-8',
        write_headers: true,
        headers: headers,
        force_quotes: true
    }

    CSV.generate(csv_options) do |csv|
      user_grouped.each_with_index do |(_, source), index|
        row = ExportObjectKeyResultsCsvRow.new(source, okr_period)

        next unless row.has_okr?

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

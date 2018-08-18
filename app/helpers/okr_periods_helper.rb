require 'date'
require 'optparse'
require 'csv'

module OkrPeriodsHelper

  # DataAccessLayer
  class ExportObjectKeyResultsDataAccessor
    def self.get_export_data(organization_id, period_id)
      connection = ActiveRecord::Base.connection

      sql = <<~EOS
      select
        u.id as user_id
        , u.email as user_email
        , u.last_name as user_last_name
        , u.first_name as user_first_name
        , u.disabled_at as user_disabled_at
        , o_order.list as o_order
        , own_key_results.kr_id as kr_kr_id
        , own_key_results.kr_name as kr_kr_name
        , own_key_results.kr_progress as kr_kr_progress
        , own_key_results.kr_sub_progress as kr_kr_sub_progress
        , own_key_results.kr_created_at as kr_kr_created_at
        , own_key_results.target_value as kr_target_value
        , own_key_results.actual_value as kr_actual_value
        , own_key_results.value_unit as kr_value_unit
        , own_key_results.expired_date as kr_expired_date
        , own_key_results.o_id as kr_o_id
        , own_key_results.o_name as kr_o_name
        , own_key_results.o_progress as kr_o_progress
        , own_key_results.o_sub_progress as kr_o_sub_progress
        , own_key_results.o_created_at as kr_o_created_at
        , own_key_results.o_kr_order as kr_o_kr_order
        , own_key_results.o_user_id as kr_o_user_id
        , own_key_results.o_user_last_name as kr_o_user_last_name
        , own_key_results.o_user_first_name as kr_o_user_first_name
        , own_key_results.o_user_disabled_at as kr_o_user_disabled_at
        , own_key_results.p_kr_id as kr_p_kr_id
        , own_key_results.p_kr_name as kr_p_kr_name
        , own_key_results.p_kr_progress as kr_p_kr_progress
        , own_key_results.p_kr_sub_progress as kr_p_kr_sub_progress
        , own_key_results.p_kr_target_value as kr_p_kr_target_value
        , own_key_results.p_kr_actual_value as kr_p_kr_actual_value
        , own_key_results.p_kr_user_id as kr_p_kr_user_id
        , own_key_results.p_kr_user_last_name as kr_p_kr_user_last_name
        , own_key_results.p_kr_user_first_name as kr_p_kr_user_first_name
        , own_key_results.p_kr_user_disabled_at as kr_p_kr_user_disabled_at
        , own_objectives.o_id as o_o_id
        , own_objectives.o_name as o_o_name
        , own_objectives.o_progress as o_o_progress
        , own_objectives.o_sub_progress as o_o_sub_progress
        , own_objectives.o_created_at as o_o_created_at
        , own_objectives.o_user_id as o_o_user_id
        , own_objectives.o_user_last_name as o_o_user_last_name
        , own_objectives.o_user_first_name as o_o_user_first_name
        , own_objectives.o_user_disabled_at as o_o_user_disabled_at
        , own_objectives.p_kr_id as o_p_kr_id
        , own_objectives.p_kr_name as o_p_kr_name
        , own_objectives.p_kr_progress as o_p_kr_progress
        , own_objectives.p_kr_sub_progress as o_p_kr_sub_progress
        , own_objectives.p_kr_target_value as o_p_kr_target_value
        , own_objectives.p_kr_actual_value as o_p_kr_actual_value
        , own_objectives.p_kr_user_id as o_p_kr_user_id
        , own_objectives.p_kr_user_last_name as o_p_kr_user_last_name
        , own_objectives.p_kr_user_first_name as o_p_kr_user_first_name
        , own_objectives.p_kr_user_disabled_at as o_p_kr_user_disabled_at
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
             , kr.sub_progress_rate as kr_sub_progress
             , kr.target_value
             , kr.actual_value
             , kr.value_unit
             , kr.expired_date
             , kr.created_at as kr_created_at
             , o.id as o_id
             , o.key_result_order
             , o.name as o_name
             , o.progress_rate as o_progress
             , o.sub_progress_rate as o_sub_progress
             , o.key_result_order as o_kr_order
             , o.created_at as o_created_at
             , ou.id as o_user_id
             , ou.last_name as o_user_last_name
             , ou.first_name as o_user_first_name
             , ou.disabled_at as o_user_disabled_at
             , parent_kr.id as p_kr_id
             , parent_kr.name as p_kr_name
             , parent_kr.progress_rate as p_kr_progress
             , parent_kr.sub_progress_rate as p_kr_sub_progress
             , parent_kr.target_value as p_kr_target_value
             , parent_kr.actual_value as p_kr_actual_value
             , parent_kr_user.id as p_kr_user_id
             , parent_kr_user.last_name as p_kr_user_last_name
             , parent_kr_user.first_name as p_kr_user_first_name
             , parent_kr_user.disabled_at as p_kr_user_disabled_at
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
             , oo.sub_progress_rate as o_sub_progress
             , oo.created_at as o_created_at
             , oou.id as o_user_id
             , oou.last_name as o_user_last_name
             , oou.first_name as o_user_first_name
             , oou.disabled_at as o_user_disabled_at
             , o_parent_kr.id as p_kr_id
             , o_parent_kr.name as p_kr_name
             , o_parent_kr.progress_rate as p_kr_progress
             , o_parent_kr.sub_progress_rate as p_kr_sub_progress
             , o_parent_kr.target_value as p_kr_target_value
             , o_parent_kr.actual_value as p_kr_actual_value
             , o_parent_kr_user.id as p_kr_user_id
             , o_parent_kr_user.last_name as p_kr_user_last_name
             , o_parent_kr_user.first_name as p_kr_user_first_name
             , o_parent_kr_user.disabled_at as p_kr_user_disabled_at
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
          on own_objectives.o_user_id = u.id
      where org.id = #{organization_id}
      order by u.id;
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
      @user_name = get_user_name(first['user_last_name'], first['user_first_name'], first['user_disabled_at'])
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

        objective_value = get_objective_value(objective, index)
        key_results_value = get_key_results_value(key_results)

        unless parent_kr.nil?
          parent_kr_value = get_parent_kr_value(parent_kr)
          result += "#{parent_kr_value}\n"
        end

        result += "#{objective_value}\n"
        result += "#{key_results_value}"
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
                                .reject { |item| item[:objective].nil? }
                                .map { |item| item[:objective][:id] }

      ok_trees = okr_trees_exists_key_results.concat(to_okr_trees_objective_only(source, treed_objective_ids))

      if source.first['o_order'].nil?
        ok_trees.sort_by! { |i| i[:objective][:created_at] }
      else
        o_order = source.first['o_order'].split(',').map { |i| i.delete('[]"\\\\') }.reverse
        order_sorted = []

        o_order.each do |id|
          o = ok_trees.find { |i| i[:objective][:id].to_s == id }
          order_sorted.push(o) unless o.nil?
        end

        # order の無いものを created_at で sort する
        o_ids = ok_trees.map { |i| i[:objective][:id].to_s }
        no_order_ids = o_ids - o_order
        order_by_created_at_ok_trees = ok_trees.select { |i| no_order_ids.include?(i[:objective][:id].to_s) }
                                           .sort_by { |i| i[:objective][:created_at] }

        ok_trees = order_sorted.concat(order_by_created_at_ok_trees)
      end

      ok_trees
    end

    # 自分が責任者の KR をまとめて OKRツリーにする
    def to_okr_trees_exists_key_results(source)
      # O を持つ KR を Tree にする
      okr_tree = to_okr_trees_exists_objective(source)

      # O の無い KR を Tree にする
      no_objective_krs = source.select { |i| !i['kr_kr_id'].nil? && i['kr_o_id'].nil? && i['o_o_id'].nil? }
      no_objective_key_results = no_objective_krs.map do |record|
        {
            parent_kr: nil,
            objective: {
                id: record['kr_o_id'],
                name: record['kr_o_name'],
                progress: record['kr_o_progress'],
                sub_progress: record['kr_o_sub_progress'],
                created_at: record['kr_o_created_at'],
                owner_id: record['kr_o_user_id'],
                owner: get_user_name(record['kr_o_user_last_name'], record['kr_o_user_first_name'], record['kr_o_user_disabled_at'])
            },
            key_results: [{
                              name: record['kr_kr_name'],
                              progress: record['kr_kr_progress'],
                              sub_progress: record['kr_kr_sub_progress'],
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
      kr_o_grouped = source.reject { |i| i['kr_o_id'].nil? }.group_by { |i| i['kr_o_id'] }

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
                          sub_progress: first['kr_p_kr_sub_progress'],
                          target_value: first['kr_p_kr_target_value'],
                          actual_value: first['kr_p_kr_actual_value'],
                          owner_id: first['kr_p_kr_user_id'],
                          owner: get_user_name(first['kr_p_kr_user_last_name'], first['kr_p_kr_user_first_name'], first['kr_p_kr_user_disabled_at'])
                      }
                    end

        objective = {
            id: first['kr_o_id'],
            name: first['kr_o_name'],
            progress: first['kr_o_progress'],
            sub_progress: first['kr_o_sub_progress'],
            created_at: first['kr_o_created_at'],
            owner_id: first['kr_o_user_id'],
            owner: get_user_name(first['kr_o_user_last_name'], first['kr_o_user_first_name'], first['kr_o_user_disabled_at'])
        }

        kr_source = records.uniq { |i| i['kr_kr_id'] }

        if first['kr_o_kr_order'].nil?
          kr_source.sort_by! { |i| i['kr_kr_created_at'] }
        else
          kr_order = first['kr_o_kr_order'].split(',').map { |i| i.delete('[]"\\\\') }
          sorted = []

          kr_order.each do |id|
            kr = kr_source.find { |i| i['kr_kr_id'].to_s == id }
            sorted.push(kr) unless kr.nil?
          end

          kr_ids = kr_source.map { |i| i['kr_kr_id'].to_s }
          no_ordered_kr_ids = kr_ids - kr_order
          order_by_created_at_kr_source = kr_source.select { |i| no_ordered_kr_ids.include?(i['kr_kr_id'].to_s) }
                                              .sort_by { |i| i['kr_kr_created_at'] }

          kr_source = sorted.concat(order_by_created_at_kr_source)
        end

        key_results = kr_source.map do |record|
          {
              name: record['kr_kr_name'],
              progress: record['kr_kr_progress'],
              sub_progress: record['kr_kr_sub_progress'],
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

      objective_only.uniq { |i| i['o_o_id'] }.map do |record|
        parent_kr = if record['o_p_kr_id'].nil?
                      nil
                    else
                      {
                          name: record['o_p_kr_name'],
                          progress: record['o_p_kr_progress'],
                          sub_progress: record['o_p_kr_sub_progress'],
                          target_value: record['o_p_kr_target_value'],
                          actual_value: record['o_p_kr_actual_value'],
                          owner_id: record['o_p_kr_user_id'],
                          owner: get_user_name(record['o_p_kr_user_last_name'], record['o_p_kr_user_first_name'], record['o_p_kr_user_disabled_at'])
                      }
                    end

        objective = {
            id: record['o_o_id'],
            name: record['o_o_name'],
            progress: record['o_o_progress'],
            sub_progress: record['o_o_sub_progress'],
            created_at: record['o_o_created_at'],
            owner_id: record['o_o_user_id'],
            owner: get_user_name(record['o_o_user_last_name'], record['o_o_user_first_name'], record['o_o_user_disabled_at'])
        }

        {
            parent_kr: parent_kr,
            objective: objective,
            key_results: []
        }
      end
    end

    def get_user_name(last_name, first_name, disabled_at)
      "#{disabled_at ? '(無効) ' : ''}#{last_name} #{first_name}"
    end

    def get_parent_kr_value(parent_kr)
      progress_rate = parent_kr[:progress] || parent_kr[:sub_progress] || 0

      achievement_rate = get_achievement_rate(parent_kr[:target_value], parent_kr[:actual_value])

      rate = get_key_result_rate_value(achievement_rate, progress_rate)

      prefix = '上位 KR'
      prefix = "(#{prefix})" if parent_kr[:owner_id] != @user_id

      "┌ #{prefix}: #{parent_kr[:name]} [#{rate}, #{parent_kr[:owner]}]"
    end

    def get_objective_value(objective, index)
      progress = objective[:progress] || objective[:sub_progress] || 0

      prefix = "O#{index + 1}"
      prefix = "(#{prefix})" if objective[:owner_id] != @user_id

      "#{prefix}: #{objective[:name]} [#{progress}%, #{objective[:owner]}]"
    end

    def get_achievement_rate(target_value, actual_value)
      if target_value.present? && actual_value.present? && target_value.positive?
        (actual_value * 100 / target_value).round
      end
    end

    def get_key_result_rate_value(achievement_rate, progress_rate)
      if achievement_rate.nil? || progress_rate == achievement_rate
        "#{progress_rate}%"
      else
        "#{progress_rate}% (達成率: #{achievement_rate}%)"
      end
    end

    def get_key_results_value(key_results)
      result = ''
      count = key_results.count

      return result if count.zero?

      key_results.each_with_index do |key_result, index|
        tree_symbol = index + 1 == count ? '┗' : '┣'
        target_value = key_result[:target_value]
        actual_value = key_result[:actual_value]
        value_unit = key_result[:value_unit]

        progress_rate = key_result[:progress] || key_result[:sub_progress] || 0

        achievement_rate = get_achievement_rate(target_value, actual_value)
        rate = get_key_result_rate_value(achievement_rate, progress_rate)

        target_actual = ''
        target_actual += " 目標値: #{format_float(target_value)} #{value_unit}," if target_value.present?
        unless target_value.nil?
          value = actual_value.nil? ? '-' : "#{format_float(actual_value)}"
          target_actual += " 実績値: #{value} #{value_unit},"
        end

        prefix = "KR#{index + 1}"

        result += "#{tree_symbol} #{prefix}: #{key_result[:name]} [#{rate}, #{@user_name},#{target_actual} 期限: #{key_result[:expired_date]}]\n"
      end

      result
    end

    def format_float(value)
      value == value.to_i ? value.to_i : value
    end
  end

  # ServiceLayer
  class ExportObjectKeyResultsService
    def self.create_csv_value(okr_period)
      export_data = ExportObjectKeyResultsDataAccessor.get_export_data(okr_period.organization_id, okr_period.id)

      return if export_data.count.zero?

      user_grouped = export_data.group_by { |item| item['user_id'] }

      headers = ['', 'ユーザー名', 'メールアドレス', 'OKR']
      csv_options = {
          encoding: 'UTF-8',
          write_headers: true,
          headers: headers,
          force_quotes: true
      }

      bom = "\uFEFF"
      CSV.generate(bom, csv_options) do |csv|
        user_grouped.each_with_index do |(_, source), index|
          row = ExportObjectKeyResultsCsvRow.new(source, okr_period)

          next unless row.has_okr?

          csv << [index + 1, row.user_name, row.email, row.okr_column_value]
        end
      end
    end
  end

  # execute export
  def execute_export(okr_period)
    ExportObjectKeyResultsService.create_csv_value(okr_period)
  end
end

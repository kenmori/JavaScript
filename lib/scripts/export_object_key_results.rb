require 'optparse'
require 'csv'

class ExportObjectKeyResuts

  def self.execute(organization, period_from, period_to)
    puts "organization: #{organization}, period-from: #{period_from}, period-to: #{period_to}"

    export_data = get_export_data(organization, period_from, period_to)

    user_grouped = export_data.group_by {|item| item['key_result_owner_id']}

    rows = []
    user_grouped.each do |key, source|
      rows.push(RecordRow.new(source))
    end
  end

  def self.get_export_data(organization, period_from, period_to)
      connection = ActiveRecord::Base.connection

      # sanitize
      org_name = connection.quote(organization)
      from = connection.quote(period_from)
      to = connection.quote(period_to)

      connection.select_all("
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
  , ou.last_name as objective_owner_last_name
  , ou.first_name as objective_owner_first_name
  , parent_kr.id as parent_key_result_id
  , parent_kr.name as parent_key_result_name
  , parent_kr.progress_rate as parent_key_result_progress
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
order by u.id, objective_id;").to_hash
  end

  class RecordRow
    @user_name
    @email
    @okr_start_period
    @okr_end_period
    @okrs

    def initialize(source)
      first_row = source.first
      
      @user_name = get_full_name(first_row['key_result_owner_last_name'], first_row['key_result_owner_first_name'])
      @email = first_row['key_result_owner_email']
      @okr_start_period = first_row['okr_start_period']
      @okr_end_period = first_row['okr_end_period']
      @okrs = to_okrs(source)
    end

    def get_full_name(last_name, first_name)
      "#{last_name} #{first_name}"
    end

    def to_okrs(source)
      okrs = []

      objective_grouped = source.group_by {|item| item['objective_id']}

      objective_grouped.each do |key, record|
        first_record = record.first

        parent_kr = first_record['parent_key_result_id'].nil? ? nil : {
          name: first_record['parent_key_result_name'],
          progress: first_record['parent_key_result_progress'],
          owner: get_full_name(first_record['parent_key_result_owner_last_name'], first_record['parent_key_result_owner_first_name'])
        }
        
        objective = {
          name: first_record['objective_name'],
          progress: first_record['objective_progress'],
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
  end

  private_constant :RecordRow
end

options = {}

parsed = OptionParser.new { |opt|
  opt.on('-o', '--organization', 'OKR出力対象組織を指定します。') 
  opt.on('-f', '--period-from', '出力対象のOKR開始時期を指定します。')
  opt.on('-t', '--period-to', '出力対象のOKR終了時期を指定します。')

}.parse(ARGV, into: options)

ExportObjectKeyResuts.execute(parsed[0], parsed[1], parsed[2])

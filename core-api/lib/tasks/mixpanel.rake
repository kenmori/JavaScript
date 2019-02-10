# frozen_string_literal: true

require "mixpanel-ruby"

tracker = Mixpanel::Tracker.new(ENV.fetch("MIXPANEL_TOKEN", ""))

namespace :mixpanel do
  desc "Update users data in Mixpanel"
  task update: :environment do
    # 各organizationの現在のOKR期間をキャッシュしておく
    current_periods = {}
    OkrPeriod.current.includes(:organization).each do |period|
      current_periods[period.organization.id] = period.id
    end

    enabled_users = User.enabled.includes(:organization)
    enabled_users.each do |eu|
      owner_objectives = eu.objective_members.where(role: :owner).map(&:objective).select { |o| o.okr_period_id == current_periods[eu.organization.id] }
      owner_key_results = eu.key_result_members.where(role: :owner).map(&:key_result).select { |k| k.okr_period_id == current_periods[eu.organization.id] }
      member_key_results = eu.key_result_members.where(role: :member).map(&:key_result).select { |k| k.okr_period_id == current_periods[eu.organization.id] }
      tracker.people.set(eu.id, {
                           "$first_name" => eu.first_name,
                           "$last_name" => eu.last_name,
                           "$email" => eu.email,
                           "Admin" => eu.admin ? true : false,
                           "OrganizationId" => eu.organization.id,
                           "Organization" => eu.organization.name,
                           "Owner Objectives" => owner_objectives ? owner_objectives.length : 0,
                           "Owner Key Results" => owner_key_results ? owner_key_results.length : 0,
                           "Member Key Results" => member_key_results ? member_key_results.length : 0
                         }, ip = 0, "$ignore_time" => "true")
    end

    # 3ヶ月前に無効化されたユーザを削除対象とする
    disabled_users = User.where("disabled_at >= ?", Time.zone.today - 3.months)
    disabled_users.each do |du|
      tracker.people.delete_user(du.id)
    end
  end
end

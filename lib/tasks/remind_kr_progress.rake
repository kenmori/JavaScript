# frozen_string_literal: true

namespace :remind_kr_progress do
  def notify_remind_email_enabled_owners
    owners = []
    OkrPeriod.current.each do |current_okr|
      owners.concat(
        current_okr&.key_results&.map { |k| k.owner if k.owner.user_setting.notify_remind_email_enabled && !k.disabled }.compact
      )
    end
    owners.uniq!(&:id)
  end

  def send_reminder
    owners = notify_remind_email_enabled_owners
    owners.each do |owner|
      NotificationMailer.remind_progress_rate_for_key_result(owner).deliver_later
    end
  end

  desc "Send reminder per week of progress rate for KeyResults"
  task send_email_per_week: :environment do
    if Date.today.end_of_week == Date.today.end_of_month
      puts "Skip send reminder, because today is end of month"
      return
    end
    send_reminder
  end

  desc "Send reminder per month of progress rate for KeyResults"
  task send_email_per_month: :environment do
    send_reminder
  end
end

# frozen_string_literal: true

class Mailer::BouncedEmailInterceptor
  def self.delivering_email(message)
    message.to = reject_bounced_email(message.to)
    # CC/BCCは現状使っていないのでチェックしない

    message.perform_deliveries = message.to.present?
  end

  private

    def self.reject_bounced_email(emails)
      bounced_emails = BounceEmail.where(email: emails).pluck(:email)
      emails - bounced_emails
    end
end

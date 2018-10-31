class Mailer::BouncedEmailInterceptor
  def self.delivering_email(message)
    message.to = drop_bounced_email(message.to)
    # CC/BCCは現状使っていないのでチェックしない

    if message.to.blank?
      message.perform_deliveries = false
    end
  end

  private

    def self.drop_bounced_email(emails)
      bounced_emails = BounceEmail.where(email: emails).pluck(:email)
      emails.reject { |e| bounced_emails.include?(e) }
    end
end

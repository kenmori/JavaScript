class NotificationMailer < ApplicationMailer

  def assign_key_result
    @greeting = "Hi"
    mail to: "to@example.com", subject: 'Resily'
  end
end

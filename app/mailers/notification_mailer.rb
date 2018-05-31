class NotificationMailer < ApplicationMailer

  def assign_key_result(assignee, key_result)
    @assignee = "#{assignee.last_name} #{assignee.first_name}"
    @key_result = key_result
    mail to: assignee.email,
         subject: 'Resily 新しい OKR が割当てられました'
  end
end

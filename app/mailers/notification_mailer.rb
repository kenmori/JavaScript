class NotificationMailer < ApplicationMailer

  def assign_key_result(assignor, assignee, key_result)
    @assignor = "#{assignor.last_name} #{assignor.first_name}"
    @assignee = "#{assignee.last_name} #{assignee.first_name}"
    @key_result = key_result
    @url = url_for(controller: 'home')
    mail to: assignee.email,
         subject: 'Resily 新しい OKR が割当てられました'
  end
end

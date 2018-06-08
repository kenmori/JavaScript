class NotificationMailer < ApplicationMailer

  def assign_key_result(current_user, user, key_result)
    return unless current_user
    return if current_user.id == user.id

    @assignor = "#{current_user.last_name} #{current_user.first_name}"
    @assignee = "#{user.last_name} #{user.first_name}"
    @key_result = key_result
    @url = url_for(controller: 'home')

    mail to: user.email,
         subject: 'Resily 新しい OKR が割当てられました'
  end
end

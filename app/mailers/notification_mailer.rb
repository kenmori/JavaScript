class NotificationMailer < ApplicationMailer

  def assign_key_result(current_user, user, key_result)
    return unless current_user
    return if current_user.id == user.id

    @assignor = "#{current_user.last_name} #{current_user.first_name}"
    @assignee = "#{user.last_name} #{user.first_name}"
    @key_result = key_result
    @url = url_for(controller: 'home')

    mail to: user.email,
         subject: '[Resily] 新しい OKR が割当てられました'
  end

  def change_kr_status(current_user, key_result)
    return unless current_user

    objective_owner = key_result.objective.owner
    key_result_owner = key_result.owner
    bcc = []
    bcc << objective_owner.email if current_user.id != objective_owner.id
    bcc << key_result_owner.email if current_user.id != key_result_owner.id && objective_owner.id != key_result_owner.id
    return if bcc.empty?

    @key_result = key_result
    @url = url_for(controller: 'home')

    mail bcc: bcc,
         subject: '[Resily] Key Result の見通しが変更されました'
  end
end

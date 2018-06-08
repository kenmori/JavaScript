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

  def self.send_change_kr_status(current_user, key_result)
    change_kr_status(current_user, key_result.objective.owner, key_result).deliver_later
    if key_result.objective.owner.id != key_result.owner.id
      change_kr_status(current_user, key_result.owner, key_result).deliver_later
    end
  end

  def change_kr_status(current_user, user, key_result)
    return unless current_user
    return if current_user.id == user.id

    @operator = "#{current_user.last_name} #{current_user.first_name}"
    @receiver = "#{user.last_name} #{user.first_name}"
    @key_result = key_result
    @url = url_for(controller: 'home')

    mail to: user.email,
         subject: '[Resily] Key Result の見通しが変更されました'
  end
end

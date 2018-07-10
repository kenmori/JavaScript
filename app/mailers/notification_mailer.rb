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

  def self.send_change_kr_status(current_user, key_result, status_before, status_after)
    change_kr_status(current_user, key_result.objective.owner, key_result, status_before, status_after).deliver_later
    if key_result.objective.owner.id != key_result.owner.id
      change_kr_status(current_user, key_result.owner, key_result, status_before, status_after).deliver_later
    end
  end

  def change_kr_status(current_user, user, key_result, status_before, status_after)
    return unless current_user
    return if current_user.id == user.id

    @operator = "#{current_user.last_name} #{current_user.first_name}"
    @receiver = "#{user.last_name} #{user.first_name}"
    @key_result = key_result
    @status_before = status_to_text(status_before)
    @status_after = status_to_text(status_after) # キャッシュ時は key_result.status = status_before となるため使わない
    @url = url_for(controller: 'home')

    mail to: user.email,
         subject: '[Resily] Key Result の見通しが変更されました'
  end

  def self.send_add_kr_comment(current_user, key_result, comment)
    add_kr_comment(current_user, key_result.objective.owner, key_result, comment).deliver_later
    if key_result.objective.owner.id != key_result.owner.id
      add_kr_comment(current_user, key_result.owner, key_result, comment).deliver_later
    end
  end

  def add_kr_comment(current_user, user, key_result, comment)
    return unless current_user
    return if current_user.id == user.id

    @author = "#{current_user.last_name} #{current_user.first_name}"
    @receiver = "#{user.last_name} #{user.first_name}"
    @key_result = key_result
    @comment = comment
    @url = url_for(controller: 'home')

    mail to: user.email,
         subject: '[Resily] Key Result に新しいコメントが投稿されました'
  end

  private

  def status_to_text(status)
    case status
    when 'green'
      '順調'
    when 'yellow'
      '注意'
    when 'red'
      '危険'
    else
      status
    end
  end
end

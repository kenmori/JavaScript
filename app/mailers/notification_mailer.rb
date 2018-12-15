# frozen_string_literal: true

class NotificationMailer < ApplicationMailer
  def assign_key_result(current_user, user, key_result)
    return unless current_user
    return if current_user.id == user.id

    # FIXME: Switch decorator
    @assignor = "#{current_user.last_name} #{current_user.first_name}"
    @assignee = "#{user.last_name} #{user.first_name}"
    @key_result = key_result
    @url = url_for(controller: "home")

    mail to: user.email,
         subject: "[Resily] 新しい OKR が割当てられました"
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

    # FIXME: Switch decorator
    @operator = "#{current_user.last_name} #{current_user.first_name}"
    @receiver = "#{user.last_name} #{user.first_name}"
    @key_result = key_result
    @status_before = status_to_text(status_before)
    @status_after = status_to_text(status_after) # キャッシュ時は key_result.status = status_before となるため使わない
    @url = url_for(controller: "home")

    mail to: user.email,
         subject: "[Resily] Key Result の見通しが変更されました"
  end

  def change_o_disabled(current_user, objective, disabled)
    user = objective.owner
    return unless current_user
    return if current_user.id == user.id

    # FIXME: Switch decorator
    @operator = "#{current_user.last_name} #{current_user.first_name}"
    @receiver = "#{user.last_name} #{user.first_name}"
    @objective = objective
    @enabled_or_disabled = disabled ? "無効化" : "有効化"
    @url = url_for(controller: "home")

    mail to: user.email,
         subject: "[Resily] Objective が#{@enabled_or_disabled}されました"
  end

  def update_o_comment(current_user, objective, target_user)
    return unless current_user

    @operator = "#{current_user.last_name} #{current_user.first_name}"
    @receiver = "#{target_user.last_name} #{target_user.first_name}"
    @objective = objective
    @url = url_for(controller: "home")

    mail to: target_user.email,
         subject: "[Resily] Objective にコメントが追加されました"
  end

  def change_kr_disabled(current_user, key_result, disabled)
    user = key_result.owner
    return unless current_user
    return if current_user.id == user.id

    # FIXME: Switch decorator
    @operator = "#{current_user.last_name} #{current_user.first_name}"
    @receiver = "#{user.last_name} #{user.first_name}"
    @key_result = key_result
    @enabled_or_disabled = disabled ? "無効化" : "有効化"
    @url = url_for(controller: "home")

    mail to: user.email,
         subject: "[Resily] Key Result が#{@enabled_or_disabled}されました"
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

    # FIXME: Switch decorator
    @author = "#{current_user.last_name} #{current_user.first_name}"
    @receiver = "#{user.last_name} #{user.first_name}"
    @key_result = key_result
    @comment = comment
    @url = url_for(controller: "home")

    mail to: user.email,
         subject: "[Resily] Key Result に新しいコメントが投稿されました"
  end

  def remind_progress_rate_for_key_result(user)
    # TODO: Switch decorator
    @owner_name = "#{user.last_name} #{user.first_name}"
    campaign_param = { utm_campaign: GaCampaignParams::UTM_CAMPAIGN_REMIND_EMAIL, utm_source: GaCampaignParams::UTM_SOURCE_EMAIL, utm_medium: GaCampaignParams::UTM_MEDIUM_EMAIL }
    @url = "#{url_for(controller: 'home')}?#{campaign_param.to_query}"

    mail to: user.email,
         subject: "[Resily] 進捗と重要なアクションを共有しましょう"
  end

  def update_kr_progress_rate(operator, objective_owner, key_result)
    # TODO: Switch decorator
    @operator_name = "#{operator.last_name} #{operator.first_name}"

    @key_result = key_result
    key_result_owner = key_result.owner
    @key_result_owner_name = "#{key_result_owner.last_name} #{key_result_owner.first_name}"

    campaign_param = { utm_campaign: GaCampaignParams::UTM_CAMPAIGN_UPDATE_KR_PROGRESS_RATE_EMAIL, utm_source: GaCampaignParams::UTM_SOURCE_EMAIL, utm_medium: GaCampaignParams::UTM_MEDIUM_EMAIL }
    @url = "#{url_for(controller: 'home')}?#{campaign_param.to_query}"

    mail to: objective_owner.email,
         subject: "[Resily] あなたの OKR の進捗が更新されました"
  end

  private

    def status_to_text(status)
      case status
      when "green"
        "順調"
      when "yellow"
        "注意"
      when "red"
        "危険"
      else
        status
      end
    end
end

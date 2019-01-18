# frozen_string_literal: true

class KeyResultsController < ApplicationController
  def index
    if params[:user_id].present?
      @user = User.find(params[:user_id])
      forbidden and return unless valid_permission?(@user.organization.id)

      @key_results = @user.key_results
                          .where(okr_period_id: params[:okr_period_id])
                          .order(created_at: :desc)
    else
      @key_results = current_organization
                     .okr_periods
                     .find(params[:okr_period_id])
                     .key_results
                     .order(created_at: :desc)
    end
  end

  def index_candidates
    index
  end

  def index_unprocessed
    @user = User.find(params[:user_id])
    forbidden and return unless valid_permission?(@user.organization.id)

    @key_results = @user.key_results.unprocessed
                        .where(okr_period_id: params[:okr_period_id])
                        .order(created_at: :desc)
    render action: :index
  end

  def show_objective
    key_result = KeyResult.find(params[:id])
    forbidden and return unless valid_permission?(key_result.owner.organization.id)
    @objective = key_result.objective
    render "objectives/show"
  end

  def create
    @user = User.find(params[:key_result][:owner_id])
    owner = Objective.find(params[:key_result][:objective_id]).owner
    forbidden and return unless valid_permission?(@user.organization.id)
    forbidden and return unless valid_permission?(owner.organization.id)
    forbidden and return unless User.includes(:organization).where(id: params[:key_result][:members]).all? { |u| valid_permission?(u.organization.id) }
    forbidden("Objective 責任者のみ作成できます") and return unless valid_user?(owner.id)

    ActiveRecord::Base.transaction do
      @key_result = @user.key_results.new(key_result_create_params)
      @user.save!
      update_objective if params[:key_result][:objective_id]
      params[:key_result][:members].each do |id|
        @key_result.key_result_members.create!(user_id: id, role: :member)
      end
    end
    render status: :created
  rescue StandardError
    unprocessable_entity_with_errors(@key_result.errors.full_messages)
  end

  def update
    @key_result = KeyResult.find(params[:id])
    forbidden and return unless valid_permission?(@key_result.owner.organization.id)
    forbidden("Objective 責任者または Key Result 責任者のみ編集できます") and return unless valid_user_to_update?

    ActiveRecord::Base.transaction do
      update_objective if params[:key_result][:objective_id] # 再帰構造による無限ループ回避のため update! より先に処理する
      @key_result.update!(key_result_update_params)
      update_key_result_members if params[:key_result][:member]
      update_comment if params[:key_result][:comment]
    end
    render action: :create, status: :ok
  rescue StandardError
    unprocessable_entity_with_errors(@key_result.errors.full_messages)
  end

  def update_disabled
    @key_result = KeyResult.find(params[:id])
    forbidden and return unless valid_permission?(@key_result.owner.organization.id)
    forbidden("Objective 責任者または Key Result 責任者のみ編集できます") and return unless valid_user_to_update?

    disabled = params[:disabled]
    unless @key_result.update_attribute(:disabled_at, disabled ? Time.current : nil)
      unprocessable_entity_with_errors(@key_result.errors.full_messages)
    end
    @key_result.reload # 変更前の進捗率が返るためクエリキャッシュをクリア
  end

  def destroy
    @key_result = KeyResult.find(params[:id])
    forbidden and return unless valid_permission?(@key_result.owner.organization.id)
    forbidden("Objective 責任者のみ削除できます") and return unless valid_user?(@key_result.objective.owner.id)

    if @key_result.destroy
      render action: :create, status: :ok
    else
      unprocessable_entity_with_errors(@key_result.errors.full_messages)
    end
  end

  def update_processed
    @key_result = KeyResult.find(params[:id])
    key_result_member = @key_result.key_result_members.find_by(user_id: current_user.id)
    forbidden and return unless valid_permission?(@key_result.owner.organization.id)
    forbidden("Key Result 責任者または関係者のみ編集できます") and return unless key_result_member

    ActiveRecord::Base.transaction do
      key_result_member.update!(processed: true)
    end
  rescue StandardError
    unprocessable_entity_with_errors(@key_result.errors.full_messages)
  end

  def comment_labels
    @labels = current_user.organization.key_result_comment_labels
  end

  def history
    runner(KeyResult::History, { id: params[:id] }) do |result|
      @histories = result[:histories]
      render status: :ok
    end
  end

  private

    # TODO: 別のクラスに切り出してテストを書く
    def valid_user_to_update?
      # Objective 責任者 or KR 責任者 or 管理者の場合は true
      return true if valid_user?(@key_result.owner.id)
      return true if valid_user?(@key_result.objective.owner.id)

      # 関係者に自分を追加/削除の場合は true
      key_result_member_data = params[:key_result][:member]
      if key_result_member_data
        user_id = key_result_member_data["user"]
        role = key_result_member_data["role"] == "owner" ? :owner : :member
        return true if user_id == current_user.id && role == :member
      end

      # 自分のコメントを追加/編集/削除の場合は true
      comment_data = params[:key_result][:comment]
      if comment_data
        behavior = comment_data["behavior"]
        data = comment_data["data"]
        return true if behavior == "add"
        return true if behavior == "edit" && @key_result.comments.find(data["id"]).user_id == current_user.id
        return true if behavior == "remove" && @key_result.comments.find(data).user_id == current_user.id
      end

      false
    end

    def update_objective
      objective = Objective.find_by!(
        okr_period_id: @key_result.okr_period_id,
        id: params[:key_result][:objective_id]
      )

      unless can_update_objective?(objective)
        @key_result.errors[:base] << "この Key Result の下位 Objective には紐付けられません"
        raise
      end

      before_objective_owner_id = @key_result.objective.owner.id
      after_objective_owner_id = objective.owner.id
      if !current_user.admin? && before_objective_owner_id != current_user.id && after_objective_owner_id != current_user.id
        @key_result.errors[:base] << "変更前または変更後の Objective 責任者でないため紐付けを変更できません"
        raise
      end
    end

    def can_update_objective?(objective)
      parent_key_result = objective.parent_key_result
      return true unless parent_key_result
      return false if parent_key_result.id == @key_result.id # 親 KR が自分の場合は循環参照になるため false

      can_update_objective?(parent_key_result.objective)
    end

    def update_key_result_members
      key_result_member_data = params[:key_result][:member]
      user_id = key_result_member_data["user"]
      behavior = key_result_member_data["behavior"]
      role = key_result_member_data["role"] == "owner" ? :owner : :member

      if behavior == "add"
        if role == :owner
          # 責任者の変更
          owner = @key_result.key_result_members.find_by(role: :owner)
          if @key_result.child_objectives.joins(:objective_members).where(objective_members: { user_id: owner.user_id, role: :owner }).exists?
            owner.update!(role: :member) # 下位 Objective が紐付いている場合は関係者に変更する
          else
            owner.destroy! # 下位 Objective が紐付いていない場合は削除する
          end
        end
        member = @key_result.key_result_members.find_by(user_id: user_id)
        if member.nil?
          # 異なる組織の user_id が指定されていた場合にはエラー
          raise unless valid_permission?(User.find(user_id).organization.id)

          @key_result.key_result_members.create!(user_id: user_id, role: role)
        else
          # 関係者から責任者に変更
          member.update!(role: role)
        end
      elsif behavior == "remove"
        # 関係者が所有する下位 Objective との紐付けを外す
        @key_result.child_objectives
                   .joins(:objective_members)
                   .where(objective_members: { user_id: user_id, role: :owner })
                   .each do |objective|
          @key_result.child_objectives.delete(objective)
        end
        member = @key_result.key_result_members.find_by(user_id: user_id)
        member.destroy!
      end
    end

    def update_comment
      comment_data = params[:key_result][:comment]

      # TODO: behaviorでswitchしているのを直したい
      case comment_data["behavior"]
      when "add"
        comment_label = KeyResultCommentLabel.find_by(
          id: comment_data["key_result_comment_label"]["id"],
          organization: current_user.organization
        )
        @key_result.comments.create!(
          text: comment_data["data"],
          user_id: current_user.id,
          key_result_comment_label: comment_label
        )
      when "edit"
        data = comment_data["data"]
        comment_label = KeyResultCommentLabel.find_by(
          id: data["key_result_comment_label"]["id"],
          organization: current_user.organization
        )
        comment = @key_result.comments.find(data["id"])
        comment.update!(text: data[:text], key_result_comment_label: comment_label)
      when "update_show_meeting_board"
        data = comment_data["data"]
        comment = @key_result.comments.find(data["id"])
        comment.update!(show_meeting_board: data[:show_meeting_board])
      when "remove"
        comment = @key_result.comments.find(comment_data["data"])
        comment.destroy!
      end
    end

    def key_result_create_params
      params.require(:key_result)
            .permit(:name, :description, :objective_id, :target_value, :value_unit, :expired_date)
    end

    def key_result_update_params
      params.require(:key_result)
            .permit(:id, :name, :description, :progress_rate, :target_value, :actual_value, :value_unit, :expired_date, :status, :objective_id, :result)
    end
end

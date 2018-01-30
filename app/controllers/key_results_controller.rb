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

  def create
    @user = User.find(params[:key_result][:owner_id])
    owner = Objective.find(params[:key_result][:objective_id]).owner
    forbidden and return unless valid_permission?(@user.organization.id)
    forbidden and return unless valid_permission?(owner.organization.id)
    forbidden('Objective 責任者のみ作成できます') and return unless valid_user?(owner.id)

    ActiveRecord::Base.transaction do
      @key_result = @user.key_results.create!(key_result_create_params)
      params[:key_result][:key_result_members].each do |id|
        # FIXME: 任意のユーザIDで作成してしまうが、サーバ側で採番しない？
        @key_result.key_result_members.create!(user_id: id, role: :member)
      end
    end
    render status: :created
  rescue
    unprocessable_entity_with_errors(@key_result.errors)
  end

  def update
    @key_result = KeyResult.find(params[:id])
    forbidden and return unless valid_permission?(@key_result.owner.organization.id)
    forbidden('Objective 責任者または Key Result 責任者のみ編集できます') and return unless valid_user_to_update?

    ActiveRecord::Base.transaction do
      @key_result.update!(key_result_update_params)
      update_key_result_members if params[:key_result][:key_result_member]
      update_comment if params[:key_result][:comment]
    end
    render action: :create, status: :ok
  rescue
    unprocessable_entity_with_errors(@key_result.errors)
  end

  def destroy
    @key_result = KeyResult.find(params[:id])
    forbidden and return unless valid_permission?(@key_result.owner.organization.id)
    forbidden('Objective 責任者のみ削除できます') and return unless valid_user?(@key_result.objective.owner.id)

    ActiveRecord::Base.transaction do
      @key_result.child_objectives.each do |objective|
        @key_result.objective.child_objectives.delete(objective)
      end
      @key_result.destroy!
    end
    render action: :create, status: :ok
  rescue => e
    unprocessable_entity_with_errors(@key_result.errors)
  end

  private

  def valid_user_to_update?
    # Objective 責任者 or KR 責任者 or 管理者の場合は true
    return true if valid_user?(@key_result.owner.id)
    return true if valid_user?(@key_result.objective.owner.id)

    # 関係者に自分を追加/削除の場合は true
    key_result_member_data = params[:key_result][:key_result_member]
    if key_result_member_data
      user_id = key_result_member_data['user']
      role = key_result_member_data['role'] == 'owner' ? :owner : :member
      return true if user_id == current_user.id && role == :member
    end

    # 自分のコメントを追加/編集/削除の場合は true
    comment_data = params[:key_result][:comment]
    if comment_data
      behavior = comment_data['behavior']
      data = comment_data['data']
      return true if behavior == 'add'
      return true if behavior == 'edit' && @key_result.comments.find(data['id']).user_id == current_user.id
      return true if behavior == 'remove' && @key_result.comments.find(data).user_id == current_user.id
    end

    return false
  end

  def update_key_result_members
    key_result_member_data = params[:key_result][:key_result_member]
    user_id = key_result_member_data['user']
    behavior = key_result_member_data['behavior']
    role = key_result_member_data['role'] == 'owner' ? :owner : :member

    if behavior == 'add'
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
        # FIXME: 任意のユーザIDで作成してしまうが、サーバ側で採番しない？
        @key_result.key_result_members.create!(user_id: user_id, role: role)
      else
        # 関係者から責任者に変更
        member.update!(role: role)
      end
    elsif behavior == 'remove'
      # 関係者が所有する下位 Objective との紐付けを外す
      @key_result.child_objectives
          .joins(:objective_members)
          .where(objective_members: { user_id: user_id, role: :owner })
          .each do |objective|
        @key_result.child_objectives.delete(objective)
        @key_result.objective.child_objectives.delete(objective)
      end
      # FIXME: 任意のユーザIDで作成してしまうが、サーバ側で採番しない？
      member = @key_result.key_result_members.find_by(user_id: user_id)
      member.destroy!
    end
  end

  def update_comment
    comment_data = params[:key_result][:comment]
    if comment_data['behavior'] == 'add'
      @key_result.comments.create!(text: comment_data['data'], user_id: current_user.id)
    elsif comment_data['behavior'] == 'edit'
      data = comment_data['data']
      comment = @key_result.comments.find(data['id'])
      comment.update!(text: data[:text])
    elsif comment_data['behavior'] == 'remove'
      comment = @key_result.comments.find(comment_data['data'])
      comment.destroy!
    end
  end

  def key_result_create_params
    params.require(:key_result)
      .permit(:name, :objective_id, :target_value, :value_unit, :expired_date)
  end

  def key_result_update_params
    params.require(:key_result)
      .permit(:name, :progress_rate, :target_value, :actual_value, :value_unit, :expired_date)
  end
end

class ObjectivesController < ApplicationController
  def index
    @user = User.find(params[:user_id])
    forbidden and return unless valid_permission?(@user.organization.id)

    @objectives = @user.objectives
                    .includes(:parent_key_result, key_results: { child_objectives: [:parent_key_result, :key_results] })
                    .where(okr_period_id: params[:okr_period_id])
                    .order(created_at: :desc)
  end

  def show
    @objective = Objective.find(params[:id])
    forbidden and return unless valid_permission?(@objective.owner.organization.id)
  end

  def create
    @user = User.find(params[:objective][:owner_id])
    forbidden and return unless valid_permission?(@user.organization.id)
    forbidden('Key Result 責任者または関係者のみ作成できます') and return unless valid_user_to_create?

    ActiveRecord::Base.transaction do
      @objective = @user.objectives.new(objective_create_params)
      @user.save!
      update_parent_key_result if params[:objective][:parent_key_result_id]
    end
    render status: :created
  rescue
    unprocessable_entity_with_errors(@objective.errors.full_messages)
  end

  def update
    @objective = Objective.find(params[:id])
    forbidden and return unless valid_permission?(@objective.owner.organization.id)
    forbidden('Objective 責任者のみ編集できます') and return unless valid_user?(@objective.owner.id)

    ActiveRecord::Base.transaction do
      @objective.update!(objective_update_params)
      update_parent_key_result if params[:objective][:parent_key_result_id]
      update_objective_members if params[:objective][:objective_member]
    end
    render action: :create, status: :ok
  rescue
    unprocessable_entity_with_errors(@objective.errors.full_messages)
  end

  def destroy
    @objective = Objective.find(params[:id])
    forbidden and return unless valid_permission?(@objective.owner.organization.id)
    forbidden('Objective 責任者のみ削除できます') and return unless valid_user?(@objective.owner.id)

    if can_delete? && @objective.destroy
      head :no_content
    else
      unprocessable_entity_with_errors(@objective.errors.full_messages)
    end
  end

  private

  def valid_user_to_create?
    parent_key_result_id = params[:objective][:parent_key_result_id]
    return true if parent_key_result_id.nil?

    # KR 責任者 or KR 関係者 or 管理者の場合は true
    parent_key_result = KeyResult.find(parent_key_result_id)
    return true if valid_user?(parent_key_result.owner.id)
    return true if parent_key_result.key_result_members.exists?(user_id: current_user.id)

    return false
  end

  def can_delete?
    return true if @objective.key_results.empty?
    @objective.errors[:base] << 'Key Result が紐付いているため削除できません'
    return false
  end

  def update_parent_key_result
    parent_key_result_id = params[:objective][:parent_key_result_id]
    unless can_update_parent_key_result?(KeyResult.find(parent_key_result_id))
      @objective.errors[:base] << 'この Objective または下位 Objective に紐付く Key Result は上位 Key Result に指定できません'
      raise
    end

    objective_owner_id = @objective.owner.id
    parent_key_result = KeyResult.find(parent_key_result_id)
    if parent_key_result.key_result_members.exists?(user_id: objective_owner_id)
      # Objective 責任者が紐付ける上位 KR の責任者または関係者の場合
      is_member = parent_key_result.key_result_members.exists?(user_id: current_user.id, role: :member)
      if !current_user.admin? && is_member && objective_owner_id != current_user.id
        @objective.errors[:base] << '上位 Key Result の関係者は Objective 責任者に自分以外を指定できません'
        raise
      end
    else
      if current_user.admin? || parent_key_result.owner.id == current_user.id
        # 管理者または上位 KR 責任者の場合は上位 KR の関係者として追加する
        parent_key_result.key_result_members.create!(user_id: objective_owner_id, role: :member)
      else
        @objective.errors[:base] << '上位 Key Result の責任者または関係者でないため紐付けられません'
        raise
      end
    end
  end

  def can_update_parent_key_result?(parent_key_result)
    return true unless parent_key_result
    parent_objective = parent_key_result.objective
    return false if parent_objective.id == @objective.id # 親 Objective が自分の場合は循環参照になるため false
    return can_update_parent_key_result?(parent_objective.parent_key_result)
  end

  def update_objective_members
    objective_member_data = params[:objective][:objective_member]
    user_id = objective_member_data['user']

    # 責任者の変更 (前の owner を削除する)
    owner = @objective.objective_members.find_by(role: :owner)
    owner.destroy!

    member = @objective.objective_members.find_by(user_id: user_id)
    if member.nil?
      # FIXME: 任意のユーザIDで作成してしまうが、サーバ側で採番しない？
      @objective.objective_members.create!(user_id: user_id, role: :owner)
    else
      # 関係者から責任者に変更
      member.update!(role: :owner)
    end

    # Objective 責任者が紐付く上位 KR の責任者または関係者でない場合は追加する
    if @objective.parent_key_result && !@objective.parent_key_result.key_result_members.exists?(user_id: user_id)
      @objective.parent_key_result.key_result_members.create!(user_id: user_id, role: :member)
    end
  end

  def objective_create_params
    params.require(:objective)
      .permit(:name, :description, :parent_key_result_id, :okr_period_id)
  end

  def objective_update_params
    params.require(:objective)
      .permit(:name, :description, :parent_key_result_id, :progress_rate, :key_result_order)
  end
end

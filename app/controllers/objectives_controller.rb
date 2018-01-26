class ObjectivesController < ApplicationController
  def index
    @user = User.find(params[:user_id])
    forbidden and return unless valid_permission?(@user.organization.id)

    @objectives = @user.objectives
                    .includes(:key_results, :child_objectives)
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
    forbidden('Key Result 責任者、Key Result 関係者または管理者のみ作成できます') and return unless valid_user_to_create?

    ActiveRecord::Base.transaction do
      @objective = @user.objectives.new(objective_create_params)
      @user.save!

      # Objective 責任者が紐付く上位 KR の責任者および関係者でない場合は追加する
      if @objective.parent_key_result && !@objective.parent_key_result.key_result_members.exists?(user_id: @user.id)
        @objective.parent_key_result.key_result_members.create!(user_id: @user.id, role: :member)
      end
    end
    render status: :created
  rescue
    unprocessable_entity_with_errors(@objective.errors)
  end

  def update
    @objective = Objective.find(params[:id])
    forbidden and return unless valid_permission?(@objective.owner.organization.id)
    forbidden('Objective 責任者または管理者のみ編集できます') and return unless valid_user?(@objective.owner.id)

    ActiveRecord::Base.transaction do
      @objective.update!(objective_update_params)
      update_objective_members if params[:objective][:objective_member]
    end
    render action: :create, status: :ok
  rescue
    unprocessable_entity_with_errors(@objective.errors)
  end

  def destroy
    @objective = Objective.find(params[:id])
    forbidden and return unless valid_permission?(@objective.owner.organization.id)
    forbidden('Objective 責任者または管理者のみ削除できます') and return unless valid_user?(@objective.owner.id)

    if can_delete? && @objective.destroy
      head :no_content
    else
      unprocessable_entity_with_errors(@objective.errors)
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
    @objective.errors[:error] << 'Key Result が紐付いているため削除できません'
    return false
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

    # Objective 責任者が紐付く上位 KR の責任者および関係者でない場合は追加する
    if @objective.parent_key_result && !@objective.parent_key_result.key_result_members.exists?(user_id: user_id)
      @objective.parent_key_result.key_result_members.create!(user_id: user_id, role: :member)
    end
  end

  def objective_create_params
    params.require(:objective)
      .permit(:name, :description, :parent_objective_id, :parent_key_result_id, :okr_period_id)
  end

  def objective_update_params
    params.require(:objective)
      .permit(:name, :description, :progress_rate)
  end
end

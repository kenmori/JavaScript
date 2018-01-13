class ObjectivesController < ApplicationController
  def index
    @user = User.find(params[:user_id])
    forbidden and return unless valid_permission?(@user.organization.id)

    @objectives = @user.objectives.where(okr_period_id: params[:okr_period_id]).order(created_at: :desc)
  end

  def show
    @objective = Objective.find(params[:id])
    forbidden and return unless valid_permission?(@objective.owner.organization.id)
  end

  def create
    @user = User.find(params[:objective][:owner_id])
    return forbidden unless valid_permission?(@user.organization.id)

    @objective = @user.objectives.new(objective_create_params)
    if @user.save
      render status: :created
    else
      unprocessable_entity_with_errors(@objective.errors)
    end
  end

  def update
    @objective = Objective.find(params[:id])
    forbidden and return unless valid_permission?(@objective.owner.organization.id)

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

    if @objective.destroy
      head :no_content
    else
      unprocessable_entity_with_errors(@objective.errors)
    end
  end

  private

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

class ObjectivesController < ApplicationController
  def index
    @user = User.find(params[:user_id])
    forbidden and return unless valid_permission?(@user.organization.id)

    @objectives = @user.objectives.where(okr_period_id: params[:okr_period_id]).order(created_at: :desc)
  end

  def create
    create_params = objective_create_params.merge(
      okr_period_id: current_organization.latest_okr_period_id
    )
    return forbidden unless valid_permission?(Owner.find(create_params[:owner_id]).organization.id)

    @objective = Objective.new(create_params)
    if @objective.save
      render status: :created
    else
      unprocessable_entity_with_errors(@objective.errors)
    end
  end

  def update
    @objective = Objective.find(params[:id])
    forbidden and return unless valid_permission?(@objective.owner.user.organization.id)

    if @objective.update(objective_update_params)
      render action: :create, status: :ok
    else
      unprocessable_entity_with_errors(@objective.errors)
    end
  end

  def destroy
    @objective = Objective.find(params[:id])
    forbidden and return unless valid_permission?(@objective.owner.user.organization.id)

    if @objective.destroy
      head :no_content
    else
      unprocessable_entity_with_errors(@objective.errors)
    end
  end

  private

  def objective_create_params
    params.require(:objective)
      .permit(:name, :description, :owner_id, :parent_objective_id)
  end

  def objective_update_params
    params.require(:objective)
      .permit(:name, :description, :progress_rate, :owner_id)
  end
end

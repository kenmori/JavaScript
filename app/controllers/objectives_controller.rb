class ObjectivesController < ApplicationController
  def index
    @user = User.find(params['user_id'])
    @objectives = @user.objectives.where(okr_period_id: params['okr_period_id']).order(created_at: :desc)
  end

  def create
    @objective = Objective.new(
      params.require(:objective).permit(:name, :description, :owner_id, :parent_objective_id).merge(
        okr_period_id: current_user.organization.latest_okr_period_id
      )
    )
    if @objective.save
      render status: :created
    else
      render json: @objective.errors, status: :unprocessable_entity
    end
  end

  def update
    @objective = Objective.find(params[:id])
    if @objective.update(params.require(:objective).permit(:name, :description, :progress_rate, :owner_id))
      render action: :create, status: :ok
    else
      render json: @objective.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @objective = Objective.find(params[:id])
    if @objective.destroy
      head :no_content
    else
      render json: @objective.errors, status: :unprocessable_entity
    end
  end
end

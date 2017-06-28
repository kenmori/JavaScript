class ObjectivesController < ApplicationController
  def index
    render json: Objective.all
  end

  def create
    @objective = Objective.new(params.require(:objective).permit(:name))
    if @objective.save
      render json: { objective: @objective }, status: :created
    else
      render json: @objective.errors, status: :unprocessable_entity
    end
  end

  def update
    @objective = Objective.find(params[:id])
    if @objective.update(params.require(objective).permit(:name))
      render json: @objective, status: :ok
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

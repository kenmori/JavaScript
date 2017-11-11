class KeyResultsController < ApplicationController
  def index
    render json: KeyResult.all
  end

  def create
    @key_result = KeyResult.new(params.require(:key_result).permit(:name, :objective_id, :owner_id, :target_value, :value_unit, :expired_data))
    if @key_result.save
      render status: :created
    else
      render json: @key_result.errors, status: :unprocessable_entity
    end
  end

  def update
    @key_result = KeyResult.find(params[:id])
    if @key_result.update(params.require(:key_result).permit(:name, :description, :progress_rate, :target_value, :value_unit, :actual_value))
      render action: :create, status: :ok
    else
      render json: @key_result.errors, status: :unprocessable_entity
    end
  end
end

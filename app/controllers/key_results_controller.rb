class KeyResultsController < ApplicationController
  def index
    render json: KeyResult.all
  end

  def create
    @key_result = KeyResult.new(params.require(:key_result).permit(:name, :objective_id))
    if @key_result.save
      render json: { key_result: @key_result }, status: :created
    else
      render json: @key_result.errors, status: :unprocessable_entity
    end
  end
end

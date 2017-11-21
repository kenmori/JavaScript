class KeyResultsController < ApplicationController
  def index
    render json: KeyResult.all
  end

  def create
    ActiveRecord::Base.transaction do
      @key_result = KeyResult.create!(key_result_params)
      params[:key_result][:concerned_people].each do |id|
        @key_result.concerned_people << ConcernedPerson.new(user_id: id, role: 0)
      end
    end
    render status: :created
  rescue
    render json: @key_result.errors, status: :unprocessable_entity
  end

  def update
    @key_result = KeyResult.find(params[:id])
    if @key_result.update(params.require(:key_result).permit(:name, :description, :progress_rate, :target_value, :actual_value, :value_unit, :expired_date, :owner_id))
      render action: :create, status: :ok
    else
      render json: @key_result.errors, status: :unprocessable_entity
    end
  end

  private

  def key_result_params
    params.require(:key_result)
      .permit(:name, :objective_id, :owner_id, :target_value, :value_unit, :expired_date)
  end
end

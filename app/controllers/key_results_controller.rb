class KeyResultsController < ApplicationController
  def index
    render json: KeyResult.all
  end

  def create
    ActiveRecord::Base.transaction do
      @key_result = KeyResult.create!(key_result_create_params)
      params[:key_result][:concerned_people].each do |id|
        @key_result.concerned_people.create!(user_id: id, role: 0)
      end
    end
    render status: :created
  rescue
    render json: @key_result.errors, status: :unprocessable_entity
  end

  def update
    ActiveRecord::Base.transaction do
      @key_result = KeyResult.find(params[:id])
      @key_result.update!(key_result_update_params)
      update_concerned_people if params[:key_result][:concerned_people]
    end
    render action: :create, status: :ok
  rescue
    render json: @key_result.errors, status: :unprocessable_entity
  end

  def destroy
    @key_result = KeyResult.find(params[:id])
    if @key_result.destroy
      render action: :create, status: :ok
    else
      render json: @key_result.errors, status: :unprocessable_entity
    end
  end

  private

  def update_concerned_people
    current_people = @key_result.concerned_people.pluck(:user_id)
    new_people = params[:key_result][:concerned_people]
    add_list = new_people - current_people
    remove_list = current_people - new_people
    add_list.each do |id|
      @key_result.concerned_people.create!(user_id: id, role: 0)
    end
    remove_list.each do |id|
      person = @key_result.concerned_people.find_by(user_id: id)
      person.destroy!
    end
  end

  def key_result_create_params
    params.require(:key_result)
      .permit(:name, :objective_id, :owner_id, :target_value, :value_unit, :expired_date)
  end

  def key_result_update_params
    params.require(:key_result)
      .permit(:name, :description, :progress_rate, :target_value, :actual_value, :value_unit, :expired_date, :owner_id)
  end
end

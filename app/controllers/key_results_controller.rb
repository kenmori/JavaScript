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
      update_concerned_people if params[:key_result][:concerned_person]
      update_comment if params[:key_result][:comment]
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
    concerned_person_data = params[:key_result][:concerned_person]
    if concerned_person_data['behavior'] == 'add'
      @key_result.concerned_people.create!(user_id: concerned_person_data['data'], role: 0)
    elsif concerned_person_data['behavior'] == 'remove'
      person = @key_result.concerned_people.find_by(user_id: concerned_person_data['data'])
      person.destroy!
    end
  end

  def update_comment
    comment_data = params[:key_result][:comment]
    if comment_data['behavior'] == 'add'
      @key_result.comments.create!(text: comment_data['data'], user_id: current_user.id)
    elsif comment_data['behavior'] == 'edit'
      data = comment_data['data']
      comment = @key_result.comments.find(data['id'])
      comment.update!(text: data[:text])
    elsif comment_data['behavior'] == 'remove'
      comment = @key_result.comments.find(comment_data['data'])
      comment.destroy!
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

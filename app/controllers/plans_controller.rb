class PlansController < ApplicationController
  before_action :find_key_result

  def index
    render json: @key_result.plans
  end

  def create
    render json: @key_result.plans.create!(params), status: :created
  rescue
    head :bad_request
  end

  def update
    @key_result.plans.find(params[:id]).update!(params)
    head :ok
  rescue
    head :bad_request
  end

  private

  def find_key_result
    @key_result = KeyResult.find(params[:key_result_id])
  end
end

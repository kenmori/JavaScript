# frozen_string_literal: true

class DepartmentsController < ApplicationController
  before_action :authorize!

  def index
    result = Department::Index.call(
      params: {
        organization_id: current_organization.id,
        ids: params[:ids]
      }
    )

    if result.success?
      render json: {departments: result[:query]}, status: :ok
    else
      # TODO 共通化メソッドを使う
      errors = result["contract.default"].errors.full_messages
      render json: { error: errors }, status: 400
    end
  end

  def create
    result = Department::Create.call(
      params: params["department"].merge(organization_id: current_organization.id)
    )

    if result.success?
      @department = result[:model]
      render status: :created
    else
      # TODO 共通化メソッドを使う
      errors = result["contract.default"].errors.full_messages
      render json: { error: errors }, status: 400
    end
  end

  private

    def authorize!
      authorize Department
    end
end

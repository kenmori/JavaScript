# frozen_string_literal: true

class DepartmentsController < ApplicationController
  before_action :authorize!

  def create
    result = Department::Create.(
      params: params["department"].merge(organization_id: current_organization.id)
    )

    if result.success?
      @department = result[:model]
      render status: :created
    else
      errors = result["contract.default"].errors.full_messages
      render json: { error: errors }, status: 400
    end
  end

  private

  def authorize!
    authorize Department
  end
end

# frozen_string_literal: true

class DepartmentsController < ApplicationController
  def create
    department_params = params["department"].merge(organization_id: current_organization.id)
    result = Department::Create.(params: department_params)

    if result.success?
      @department = result[:model]
      render status: :created
    else
      errors = result["contract.default"].errors.full_messages
      render json: { error: errors }, status: 400
    end
  end
end

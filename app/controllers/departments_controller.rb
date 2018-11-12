# frozen_string_literal: true

class DepartmentsController < ApplicationController
  before_action :authorize!

  def index
    # TODO これは Department::Index にする? CQRS の Queryっぽい感じで
    roots =
      if params[:ids]
        Department.where(organization: current_organization, id: params[:ids])
      else
        Department.where(organization: current_organization).roots
      end
    departments = roots.map{|node| node.subtree.arrange_serializable(order: :display_order).first }

    render json: {departments: departments}, status: :ok
  end

  def create
    result = Department::Create.call(
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

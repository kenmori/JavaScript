# frozen_string_literal: true

class DepartmentsController < ApplicationController
  def create
    @department = Department.create!(
      name: params.dig(:department, :name),
      display_order: params.dig(:department, :display_order),
      organization_id: current_organization.id
    )

    # TODO department_id: params.dig(:department, :department_id),
    # TODO owner_id: login_user.id,

    render status: :created
  end
end

# frozen_string_literal: true

require_relative "abstract_operation_factory"

class DepartmentFactory < AbstractOperationFactory
  using DepartmentHelper

  def initialize(organization:, owner:, parent_department: nil, current_user: owner)
    super(Department::Create)
    @organization = organization
    @owner = owner
    @parent_department = parent_department
    @current_user = current_user
  end
  attr_reader :organization, :owner, :parent_department, :current_user

  def create(params = {}, options = {})
    default_options = { current_user: current_user }

    super(params, default_options.merge(options))
  end

  def create_archived(**params)
    create(params).tap do |d|
      d.archive!(current_user)
    end
  end

  private

    def default_params
      {
        name: "代表",
        display_order: 1,
        organization_id: organization.id,
        parent_department_id: parent_department&.id,
        owner_id: owner.id
      }
    end
end

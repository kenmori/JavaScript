# frozen_string_literal: true

require_relative "abstract_operation_factory"

class DepartmentFactory < AbstractOperationFactory
  def initialize(organization:, owner:, parent_department: nil)
    super(Department::Create)
    @organization = organization
    @owner = owner
    @parent_department = parent_department
  end
  attr_reader :organization, :owner, :parent_department

  class << self
    def archive(department)
      department.department_members.destroy_all
      Department::Archive.call(params: { id: department.id })
      department.reload
      department
    end
  end

  def create_archived(**params)
    create(params).tap do |d|
      DepartmentFactory.archive(d)
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

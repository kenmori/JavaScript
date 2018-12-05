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

  def create_archived(**params)
    create(params).tap {|d|
      d.department_members.destroy_all
      Department::Archive.call(params: {id: d.id})
      d.reload
    }
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

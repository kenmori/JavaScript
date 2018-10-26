class DepartmentFactory < AbstractFactory
  def initialize(organization:)
    super(Department.new)
    @organization = organization
  end
  attr_reader :organization

  def add_user(user:, role:)
    DepartmentMember.create!(
      department: @model,
      user: user,
      role: role
    )
  end

  private

  def default_params
    {
      organization: organization,
      name: "代表",
      display_order: 1,
      parent: nil
    }
  end
end

# frozen_string_literal: true

RSpec.describe Department::Update do
  let!(:organization) { OrganizationFactory.new.create }
  let!(:admin_user) { UserFactory.new(organization: organization).create(admin: true) }
  let!(:department) {
    DepartmentFactory.new(
      organization: organization,
      owner: admin_user
    ).create
  }
  let!(:other_department) {
    DepartmentFactory.new(
      organization: organization,
      owner: admin_user
    ).create(
      name: "開発部",
      display_order: 2
    )
  }
  let!(:child_department) {
    DepartmentFactory.new(
      organization: organization,
      owner: admin_user,
      parent_department: department
    ).create(
      name: "Web開発部",
      display_order: 1
    )
  }
  let(:nomal_user) do
    UserFactory.new(organization: organization).create(
      email: "nomal_user@example.com",
      first_name: "普通",
      last_name: "たろう"
    )
  end

  example "SUCCESS:" do
    params = {
      id: child_department.id,
      name: "Ruby部",
      display_order: 2,
      organization_id: organization.id,
      parent_department_id: department.id,
      owner_id: nomal_user.id
    }

    result = described_class.call(params: params)

    child_department.reload
    expect(result).to be_success
    expect(child_department.name).to eq("Ruby部")
    expect(child_department.display_order).to eq(2)
    expect(child_department.organization).to eq(organization)
    expect(child_department.parent).to eq(department)
    expect(child_department.owner).to eq(nomal_user)
  end
end

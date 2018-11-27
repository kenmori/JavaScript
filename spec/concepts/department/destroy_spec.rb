RSpec.describe Department::Destroy do
  let!(:organization) { OrganizationFactory.new.create }
  let!(:admin_user) { UserFactory.new(organization: organization).create(admin: true) }

  let!(:department) {
    DepartmentFactory.new(
      organization: organization,
      owner: admin_user
    ).create
  }

  example "SUCCESS: remove department" do
    params = {
      id: department.id
    }

    result = Department::Destroy.call(params: params)
    department = result[:model]

    expect(result).to be_success
    expect(department).to be_soft_destroyed
  end

  example "SUCCESS: 部署に紐付くOKRが場合も削除できる"

  example "ERROR: 下位部署があるケース" do
    DepartmentFactory.new(
      organization: organization,
      owner: admin_user,
      parent_department: department
    ).create

    params = {
      id: department.id
    }

    result = Department::Destroy.call(params: params)
    contract = result["contract.default"]

    expect(result).to be_failure
    expect(contract.errors.full_messages).to include(
      "下位部署が存在するのでアーカイブ出来ません"
    )
  end

  example "ERROR: 部署にユーザが所属しているケース"
end

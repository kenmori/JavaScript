RSpec.describe Department::Archive do
  let!(:organization) { OrganizationFactory.new.create }
  let!(:admin_user) { UserFactory.new(organization: organization).create(admin: true) }

  let!(:department) {
    DepartmentFactory.new(
      organization: organization,
      owner: admin_user
    ).create.tap {|d|
      # 部署にユーザーが所属していると削除できないので消す
      d.department_members.destroy_all
    }
  }

  let(:params) {
    {
      id: department.id
    }
  }

  example "SUCCESS: remove department" do
    result = Department::Archive.call(params: params)
    department = result[:model]

    expect(result).to be_success
    expect(department).to be_soft_destroyed
  end

  example "SUCCESS: 部署に紐付くOKRが存在する場合も削除できる" do
    okr_period = OkrPeriodFactory.new(
      organization: organization
    ).create
    objective = ObjectiveFactory.new(
      user: admin_user,
      okr_period: okr_period
    ).create
    DepartmentObjectiveFactory.new(
      department: department,
      objective: objective
    ).create

    result = Department::Archive.call(params: params)
    department = result[:model]

    expect(result).to be_success
    expect(department).to be_soft_destroyed
  end

  example "ERROR: 下位部署があるケース" do
    DepartmentFactory.new(
      organization: organization,
      owner: admin_user,
      parent_department: department
    ).create

    result = Department::Archive.call(params: params)
    contract = result["contract.default"]

    expect(result).to be_failure
    expect(contract.errors.full_messages).to include(
      "下位部署が存在するのでアーカイブ出来ません"
    )
  end

  example "ERROR: 部署にユーザーが所属しているケース" do
    user = UserFactory.new(organization: organization).create(
      email: "other_user@example.com"
    )
    DepartmentMemberFactory.new(
      department: department,
      user: user
    ).create

    result = Department::Archive.call(params: params)
    contract = result["contract.default"]

    expect(result).to be_failure
    expect(contract.errors.full_messages).to include(
      "ユーザが所属しているのでアーカイブ出来ません"
    )
  end
end

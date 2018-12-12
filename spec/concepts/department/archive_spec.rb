# frozen_string_literal: true

RSpec.describe Department::Archive do
  let!(:organization) { OrganizationFactory.new.create }
  let!(:admin_user) { UserFactory.new(organization: organization).create(admin: true) }

  let!(:department) do
    DepartmentFactory.new(
      organization: organization,
      owner: admin_user
    ).create.tap do |d|
      # 部署にユーザーが所属していると削除できないので消す
      d.department_members.destroy_all
    end
  end

  let(:params) do
    {
      id: department.id
    }
  end

  example "SUCCESS: 部署をアーカイブする" do
    result = described_class.call(params: params, current_user: admin_user)
    department = result[:model]

    expect(result).to be_success
    expect(department).to be_soft_destroyed
  end

  example "SUCCESS: 部署に紐付くOKRが存在する場合でもアーカイブできる" do
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

    result = described_class.call(params: params, current_user: admin_user)
    department = result[:model]

    expect(result).to be_success
    expect(department).to be_soft_destroyed
  end

  example "SUCCESS: アーカイブ済みの下位部署しか存在しない場合はアーカイブできる" do
    child_department = DepartmentFactory.new(
      organization: organization,
      owner: admin_user,
      parent_department: department
    ).create_archived(
      name: "営業部"
    )

    result = described_class.call(params: params, current_user: admin_user)
    department = result[:model]

    expect(result).to be_success
    expect(department).to be_soft_destroyed
  end

  example "ERROR: アーカイブ済みではない下位部署が存在する場合、アーカイブできない" do
    DepartmentFactory.new(
      organization: organization,
      owner: admin_user,
      parent_department: department
    ).create_archived(
      name: "営業部"
    )
    DepartmentFactory.new(
      organization: organization,
      owner: admin_user,
      parent_department: department
    ).create

    result = described_class.call(params: params, current_user: admin_user)
    contract = result["contract.default"]

    expect(result).to be_failure
    expect(contract.errors.full_messages).to include(
      "下位部署が存在するのでアーカイブ出来ません"
    )
  end

  example "ERROR: 部署にユーザーが所属している場合アーカイブできない" do
    user = UserFactory.new(organization: organization).create(
      email: "other_user@example.com"
    )
    DepartmentMemberFactory.new(
      department: department,
      user: user
    ).create

    result = described_class.call(params: params, current_user: admin_user)
    contract = result["contract.default"]

    expect(result).to be_failure
    expect(contract.errors.full_messages).to include(
      "ユーザが所属しているのでアーカイブ出来ません"
    )
  end

  context "他の組織の部署が存在する場合" do
    let!(:other_org) { OrganizationFactory.new.create(name: "other") }
    let!(:other_org_user) do
      UserFactory.new(organization: other_org).create(
        last_name: "花京院",
        first_name: "典明",
        email: "other_org_user@example.com",
        admin: true
      )
    end
    let!(:other_org_department) do
      DepartmentFactory.new(organization: other_org, owner: other_org_user).create(
        name: "企画部",
        display_order: 1
      )
    end

    example "ERROR: 別の組織の部署をアーカイブすることは出来ない" do
      params = {
        id: other_org_department.id
      }
      result = described_class.call(params: params, current_user: admin_user)

      expect(result).to be_failure
      expect(result["result.policy.default"]).to be_failure
    end
  end
end

RSpec.describe Department::Destroy do
  let!(:organization) { OrganizationFactory.new.create }
  let!(:admin_user) { UserFactory.new(organization: organization).create(admin: true) }

  let!(:department) {
    DepartmentFactory.new(
      organization: organization,
      owner: admin_user
    ).create
  }

  let(:params) {
    {
      id: department.id
    }
  }

  example "SUCCESS: remove department" do
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

    result = Department::Destroy.call(params: params)
    contract = result["contract.default"]

    expect(result).to be_failure
    expect(contract.errors.full_messages).to include(
      "下位部署が存在するのでアーカイブ出来ません"
    )
  end

  # TODO 要確認
  # ownerも所属していてはいけないのか？
  # それともmemberがいなければ削除しても良いのか？
  #   -> とりあえずmemberがいなければ削除にする
  example "ERROR: 部署にメンバーが所属しているケース" do
    user = UserFactory.new(organization: organization).create(
      email: "other_user@example.com"
    )
    DepartmentMemberFactory.new(
      department: department,
      user: user
    ).create

    result = Department::Destroy.call(params: params)
    contract = result["contract.default"]

    expect(result).to be_failure
    expect(contract.errors.full_messages).to include(
      "メンバーが所属しているのでアーカイブ出来ません"
    )
  end
end

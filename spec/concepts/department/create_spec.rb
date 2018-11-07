# frozen_string_literal: true

# TODO
# * [x] パラメータを元にデータを作成する
#   * [x] Departmentデータを作成
#   * [x] owner_id でオーナーを登録できるようにする
#   * [x] organization_id で Organization を登録できるようにする
#   * [x] parent_department_id で親 Department を登録できるようにする
# * [ ] バリデーション
#   * [ ] 各パラメータの文字数など
#   * [ ] 同じOrganizationに属しているユーザowner_id に指定する
#   * [ ] admin_userしか部署は操作できない (Policy 入れる？)
#   * [ ] parent_department_idも同じorganizationである必要がある

RSpec.describe Department::Create, focus: true do
  let!(:organization) { OrganizationFactory.new.create }
  let!(:admin_user) { UserFactory.new(organization: organization).create(admin: true) }

  example "SUCCESS: ルート部署を作成するケース" do
    params = {
      name: "開発部",
      display_order: 1,
      organization_id: organization.id,
      parent_department_id: nil,
      owner_id: admin_user.id
    }

    result = Department::Create.(params: params)
    department = result[:model]

    expect(result).to be_success
    expect(department.name).to eq("開発部")
    expect(department.display_order).to eq(1)
    expect(department.organization).to eq(organization)
    expect(department.parent).to be_nil
    expect(department.owner).to eq(admin_user)
  end

  example "SUCCESS: 子部署を作成するケース" do
    parent_department = Department.create_default!(organization: organization)

    params = {
      name: "開発部",
      display_order: 1,
      organization_id: organization.id,
      parent_department_id: parent_department.id,
      owner_id: admin_user.id
    }

    result = Department::Create.(params: params)
    department = result[:model]

    expect(result).to be_success
    expect(department.name).to eq("開発部")
    expect(department.parent).to eq(parent_department)
  end

  example "ERROR: 必須項目を入力しないケース" do
    params = {
      name: nil,
      display_order: nil,
      organization_id: nil,
      parent_department_id: nil,
      owner_id: nil
    }

    result = Department::Create.(params: params)
    contract = result["contract.default"]

    expect(result).to be_failure

    # TODO i18n
    expect(contract.errors.full_messages).to contain_exactly(
      "Nameを入力してください",
      "Display orderを入力してください",
      "Organizationを入力してください",
      "Ownerを入力してください"
    )
  end

  example "ERROR: owner_idのOrganizationと指定したorganizatio_idが異なるケース" do
    other_org = OrganizationFactory.new.create(name: "other")
    other_org_user = UserFactory.new(organization: other_org).create(
      email: "other_org_user@example.com",
      admin: true
    )

    params = {
      name: "開発部",
      display_order: 1,
      organization_id: organization.id,
      parent_department_id: nil,
      owner_id: other_org_user.id
    }

    result = Department::Create.(params: params)
    contract = result["contract.default"]

    expect(result).to be_failure

    expect(contract.errors.full_messages).to contain_exactly(
      "部署責任者は組織内のユーザーにしてください"
    )
  end

  # * [ ] admin_userしか部署は操作できない (Policy 入れる？)


  # * [ ] parent_department_idも同じorganizationである必要がある


  example "ERROR: Transaction失敗時の処理"
end

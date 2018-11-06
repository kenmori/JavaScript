# frozen_string_literal: true

# TODO
# * [ ] パラメータを元にデータを作成する
#   * [x] Departmentデータを作成
#   * [x] owner_id でオーナーを登録できるようにする
#   * [x] organization_id で Organization を登録できるようにする
#   * [ ] parent_department_id で親 Department を登録できるようにする
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
    expect(department.name).to eq("開発部")
    expect(department.display_order).to eq(1)
    expect(department.organization).to eq(organization)
    expect(department.parent).to be_nil
    expect(department.owner).to eq(admin_user)
  end

  example "SUCCESS: 子部署を作成するケース"

  example "ERROR: Transaction失敗時の処理"
end

# frozen_string_literal: true

RSpec.describe Department::Create, focus: true do
  let!(:organization) { OrganizationFactory.new.create }
  let!(:admin_user) { UserFactory.new(organization: organization).create(admin: true) }

  example "" do
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

    # TODO parent をセットするケースのテスト
    expect(department.parent).to be_nil



    # NOTE
    # admin_userしか部署は操作できない
    # 同じOrganizationに属しているユーザをowner id に指定する
    # department id も同じorganizationである必要がある

    # TODO
    # * [ ] パラメータを元にデータを作成する
    #   * [ ] Departmentデータを作成
    #   * [ ] owner_id でオーナーを登録できるようにする
    #   * [ ] organization_id で Organization を登録できるようにする
    #   * [ ] parent_department_id で親 Department を登録できるようにする
    # * [ ] バリデーション
    #   * [ ] 各パラメータの文字数など
    #   * [ ] a
    # * [ ] Policy を入れたほうがいいかも。
    #   * [ ]


  end
end

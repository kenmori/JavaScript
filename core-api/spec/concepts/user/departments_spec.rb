# frozen_string_literal: true

RSpec.describe User::Departments do
  include DepartmentDataset

  before do
    dep_1
    dep_1_1
    dep_1_1_1
    dep_1_1_2
    dep_1_2
    dep_1_2_1
    dep_1_2_2
  end

  context "dep_1, dep_1_1, dep_1_1_1, dep_1_1_2" do
    before do
      DepartmentMemberFactory.new(department: dep_1, user: nomal_user).create
      DepartmentMemberFactory.new(department: dep_1_1, user: nomal_user).create
      DepartmentMemberFactory.new(department: dep_1_1_1, user: nomal_user).create
      DepartmentMemberFactory.new(department: dep_1_1_2, user: nomal_user).create
    end

    example "SUCCESS: 自分が所属する部署を取得する" do
      result = described_class.call(params: { id: nomal_user.id }, current_user: nomal_user)

      root = result[:query].first

      expect(result[:query].size).to eq(1)
      expect(root).to include(
        "id" => dep_1.id,
        "archived" => false,
        "soft_destroyed_at" => nil,
        "name" => "代表",
        "display_order" => 1,
        "created_at" => dep_1.created_at,
        "updated_at" => dep_1.updated_at,
        "user_count" => 2,
        "children" => a_kind_of(Array)
      )
      expect(root.dig("children", 0)).to include(
        "name" => "開発部"
      )
      expect(root.dig("children", 0, "children", 0)).to include(
        "name" => "金融部"
      )
      expect(root.dig("children", 0, "children", 1)).to include(
        "name" => "Web部"
      )
    end

    example "SUCCESS: 管理者として指定したユーザの情報を取得する" do
      result = described_class.call(params: { id: nomal_user.id }, current_user: admin_user)

      root = result[:query].first

      expect(result[:query].size).to eq(1)
      expect(root.dig("name")).to eq("代表")
      expect(root.dig("children", 0, "name")).to eq("開発部")
      expect(root.dig("children", 0, "children", 0, "name")).to eq("金融部")
      expect(root.dig("children", 0, "children", 1, "name")).to eq("Web部")
    end
  end

  context "dep_1_1_1, dep_1_1_2" do
    before do
      DepartmentMemberFactory.new(department: dep_1_1_1, user: nomal_user).create
      DepartmentMemberFactory.new(department: dep_1_1_2, user: nomal_user).create
    end

    example "SUCCESS: rootが複数ある場合でも情報を取得できる" do
      result = described_class.call(params: { id: nomal_user.id }, current_user: nomal_user)

      query = result[:query]

      expect(query.dig(0, "name")).to eq("金融部")
      expect(query.dig(1, "name")).to eq("Web部")
    end
  end

  example "ERROR: 管理者でないユーザは自分以外の情報を取得できない" do
    result = described_class.call(params: { id: admin_user.id }, current_user: nomal_user)

    expect(result["result.policy.default"]).to be_failure
  end

  example "ERROR: 別の組織のユーザーの情報は取得できない" do
    # 下記2つは別組織の部署で、other_org_userが部署責任者として所属している
    dep_2
    dep_2_1

    result = described_class.call(params: { id: other_org_user.id }, current_user: admin_user)

    expect(result["result.policy.default"]).to be_failure
  end
end

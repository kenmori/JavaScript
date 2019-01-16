# frozen_string_literal: true

RSpec.describe Department::IndexCurrentUsers do
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

    example "SUCCESS" do
      result = described_class.call(params: {}, current_user: nomal_user)

      root = result[:query].first

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
  end

  context "dep_1_1_1, dep_1_1_2" do
    before do
      DepartmentMemberFactory.new(department: dep_1_1_1, user: nomal_user).create
      DepartmentMemberFactory.new(department: dep_1_1_2, user: nomal_user).create
    end

    example "SUCCESS" do
      result = described_class.call(params: {}, current_user: nomal_user)

      query = result[:query]

      expect(query.dig(0, "name")).to eq("金融部")
      expect(query.dig(1, "name")).to eq("Web部")
    end
  end
end

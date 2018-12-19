# frozen_string_literal: true

RSpec.describe Department::Index do
  include DepartmentDataset
  using DepartmentHelper

  before do
    dep_1
    dep_1_1
    dep_1_1_1
    dep_1_1_2
    dep_1_2
    dep_1_2_1
    dep_1_2_2
    dep_1_3
    dep_2
    dep_2_1
    dep_2_2
  end

  let(:l_name) { ->(h) { h[:name] } }

  example "SUCCESS: 指定した組織の情報を全て返す" do
    params = {
      organization_id: organization.id
    }

    result = described_class.call(params: params, current_user: admin_user)

    root = result[:query].first
    expect(root).to include(
      "id" => dep_1.id,
      "archived" => false,
      "soft_destroyed_at" => nil,
      "name" => "代表",
      "display_order" => 1,
      "created_at" => dep_1.created_at,
      "updated_at" => dep_1.updated_at,
      "user_count" => 1,
      "children" => a_kind_of(Array)
    )

    expect(root.dig("children").map(&l_name)).to contain_exactly("開発部", "営業部", "経理部")
    expect(root.dig("children", 0, "children").map(&l_name)).to contain_exactly("金融部", "Web部")
    expect(root.dig("children", 1, "children").map(&l_name)).to contain_exactly("クラサポ部", "販売部")
    expect(root.dig("children", 2, "children").map(&l_name)).to eq([])
  end

  example "SUCCESS: 指定したIDの部署以下の情報を返す" do
    params = {
      organization_id: organization.id,
      ids: [dep_1_1.id]
    }

    result = described_class.call(params: params, current_user: admin_user)

    root = result[:query].first
    expect(root.dig("name")).to eq("開発部")
    expect(root.dig("children").map(&l_name)).to contain_exactly("金融部", "Web部")
  end

  example "SUCCESS: 複数のIDを指定した場合、それそれのIDの部署以下の情報を全て返す" do
    params = {
      organization_id: organization.id,
      ids: [dep_1_1.id, dep_1_2.id]
    }

    result = described_class.call(params: params, current_user: admin_user)

    expect(result[:query].size).to eq(2)
    expect(result[:query].map(&l_name)).to contain_exactly("開発部", "営業部")
    expect(result[:query].dig(0, "children").map(&l_name)).to contain_exactly("金融部", "Web部")
    expect(result[:query].dig(1, "children").map(&l_name)).to contain_exactly("クラサポ部", "販売部")
  end

  example "SUCCESS: アーカイブされた部署の情報も返す" do
    dep_1_1_1.archive!(admin_user)

    params = {
      organization_id: organization.id,
      ids: [dep_1_1_1.id]
    }

    result = described_class.call(params: params, current_user: admin_user)

    # archived が true になり、 soft_destroyed_at にアーカイブした時刻が入る
    expect(result[:query][0]).to include(
      "id" => dep_1_1_1.id,
      "archived" => true,
      "soft_destroyed_at" => a_kind_of(Time),
      "name" => "金融部",
      "display_order" => 1,
      "created_at" => a_kind_of(Time),
      "updated_at" => a_kind_of(Time),
      "user_count" => 0,
      "children" => []
    )
  end

  example "ERROR: 指定した部署の組織が異なる" do
    params = {
      organization_id: organization.id,
      ids: [dep_2.id]
    }

    result = described_class.call(params: params, current_user: admin_user)
    contract = result["contract.default"]

    expect(result).to be_failure
    expect(contract.errors.full_messages).to include(
      "部署IDは組織内から選択してください"
    )
  end

  example "ERROR: 必須項目を入力しない場合" do
    result = described_class.call(params: {}, current_user: admin_user)

    contract = result["contract.default"]

    expect(result).to be_failure
    expect(contract.errors.full_messages).to include(
      "組織を入力してください"
    )
  end

  context "複数人が部署に所属している場合" do
    before do
      DepartmentMemberFactory.new(department: dep_1, user: other_user).create
      DepartmentMemberFactory.new(department: dep_1, user: nomal_user).create

      UserFactory.new(organization: organization).create(email: "dep_1_1@example.com").tap do |user|
        DepartmentMemberFactory.new(department: dep_1_1, user: user).create
      end
    end

    example "SUCCESS: user_countで所属人数を返すこと" do
      params = {
        organization_id: organization.id,
        ids: [dep_1.id]
      }

      result = described_class.call(params: params, current_user: admin_user)

      root = result[:query].first
      expect(root).to include(
        "name" => "代表",
        "user_count" => 3
      )
      expect(root.dig("children", 0)).to include(
        "name" => "開発部",
        "user_count" => 2
      )
      expect(root.dig("children", 1)).to include(
        "name" => "営業部",
        "user_count" => 1
      )
    end
  end
end

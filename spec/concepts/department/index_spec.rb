require Rails.root.join("spec/acceptance/concerns/organization_dataset")

RSpec.describe Department::Index do
  include OrganizationDataset

  # 部署データはDRYにする
  let!(:dep_1) {
    DepartmentFactory.new(organization: organization, owner: admin_user).create(
      name: "代表",
      display_order: 1
    )
  }
  let!(:dep_1_1) {
    DepartmentFactory.new(organization: organization, owner: admin_user, parent_department: dep_1).create(
        name: "開発部",
        display_order: 1
    )
  }
  let!(:dep_1_1_1) {
    DepartmentFactory.new(organization: organization, owner: admin_user, parent_department: dep_1_1).create(
      name: "金融部",
      display_order: 1
    )
  }
  let!(:dep_1_1_2) {
    DepartmentFactory.new(organization: organization, owner: admin_user, parent_department: dep_1_1).create(
      name: "Web部",
      display_order: 2
    )
  }
  let!(:dep_1_2) {
    DepartmentFactory.new(organization: organization, owner: admin_user, parent_department: dep_1).create(
      name: "営業部",
      display_order: 2
    )
  }
  let!(:dep_1_2_1) {
    DepartmentFactory.new(organization: organization, owner: admin_user, parent_department: dep_1_2).create(
      name: "クラサポ部",
      display_order: 1
    )
  }
  let!(:dep_1_2_2) {
    DepartmentFactory.new(organization: organization, owner: admin_user, parent_department: dep_1_2).create(
      name: "販売部",
      display_order: 2
    )
  }
  let!(:dep_1_3) {
    DepartmentFactory.new(organization: organization, owner: admin_user, parent_department: dep_1).create(
      name: "経理部",
      display_order: 3
    )
  }

  let!(:dep_2) {
    DepartmentFactory.new(organization: other_org, owner: other_org_user).create(
      name: "企画部",
      display_order: 1
    )
  }
  let!(:dep_2_1) {
    DepartmentFactory.new(organization: other_org, owner: other_org_user, parent_department: dep_2).create(
      name: "情報課",
      display_order: 1
    )
  }
  let!(:dep_2_2) {
    DepartmentFactory.new(organization: other_org, owner: other_org_user, parent_department: dep_2).create(
      name: "促進課",
      display_order: 2
    )
  }


  let(:l_name) { ->(h) { h[:name] } }

  example "SUCCESS: 指定した組織の情報を全て返す" do
    params = {
      organization_id: organization.id
    }

    result = described_class.call(params: params)

    root = result[:query].first
    expect(root).to include(
      "id" => dep_1.id,
      "soft_destroyed_at" => nil,
      "name" => "代表",
      "display_order" => 1,
      "created_at" => dep_1.created_at,
      "updated_at" => dep_1.updated_at,
      "children" => a_kind_of(Array)
    )

    expect(root.dig("name")).to eq("代表")
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

    result = described_class.call(params: params)

    root = result[:query].first
    expect(root.dig("name")).to eq("開発部")
    expect(root.dig("children").map(&l_name)).to contain_exactly("金融部", "Web部")
  end

  example "SUCCESS: 複数のIDを指定した場合、それそれのIDの部署以下の情報を全て返す" do
    params = {
      organization_id: organization.id,
      ids: [dep_1_1.id, dep_1_2.id]
    }

    result = described_class.call(params: params)

    expect(result[:query].size).to eq(2)
    expect(result[:query].map(&l_name)).to contain_exactly("開発部", "営業部")
    expect(result[:query].dig(0, "children").map(&l_name)).to contain_exactly("金融部", "Web部")
    expect(result[:query].dig(1, "children").map(&l_name)).to contain_exactly("クラサポ部", "販売部")
  end
end

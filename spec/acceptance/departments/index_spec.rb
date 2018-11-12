require "rspec_api_documentation/dsl"
Rails.root.join("spec/acceptance/concerns").each_child { |path| require_dependency(path) }

RSpec.resource "GET /departments", warden: true do
  explanation "departmnets#index"

  include RequestHeaderJson
  include OrganizationDataset

  before do
    # organization の部署
    DepartmentFactory.new(organization: organization, owner: admin_user).create(
      name: "代表",
      display_order: 1
    ).tap do |root_department|
      DepartmentFactory.new(organization: organization, owner: admin_user, parent_department: root_department).create(
        name: "開発部",
        display_order: 1
      ).tap do |dev_department|
        DepartmentFactory.new(organization: organization, owner: admin_user, parent_department: dev_department).create(
          name: "金融部",
          display_order: 1
        )
        DepartmentFactory.new(organization: organization, owner: admin_user, parent_department: dev_department).create(
          name: "Web部",
          display_order: 2
        )
      end

      DepartmentFactory.new(organization: organization, owner: admin_user, parent_department: root_department).create(
        name: "営業部",
        display_order: 2
      ).tap do |business_department|
        DepartmentFactory.new(organization: organization, owner: admin_user, parent_department: business_department).create(
          name: "クラサポ部",
          display_order: 1
        )
        DepartmentFactory.new(organization: organization, owner: admin_user, parent_department: business_department).create(
          name: "販売部",
          display_order: 2
        )
      end

      DepartmentFactory.new(organization: organization, owner: admin_user, parent_department: root_department).create(
        name: "経理部",
        display_order: 3
      )
    end

    # other_org の部署
    DepartmentFactory.new(organization: other_org, owner: other_org_user).create(
      name: "企画部",
      display_order: 1
    ).tap do |root_department|
      DepartmentFactory.new(organization: other_org, owner: other_org_user, parent_department: root_department).create(
        name: "情報課",
        display_order: 1
      )
      DepartmentFactory.new(organization: other_org, owner: other_org_user, parent_department: root_department).create(
        name: "促進課",
        display_order: 2
      )
    end
  end

  let(:l_name) { ->(h) { h['name'] } }

  before do
    login_as(admin_user)
  end

  get "/departments" do
    parameter :ids, "指定した部署以下にある部署の情報を返す。未指定の場合はサインイン中の組織の部署を全て返す", type: :array, items: {type: :integer}

    example "SUCCESS: Index departments" do
      explanation "サインインユーザーの組織の部署情報を全て返す"

      do_request()

      expect(status).to eq(200)

      departments = parse_response_body("departments")
      expect(departments.size).to eq(1)

      root = departments.first
      expect(root.dig("name")).to eq("代表")
      expect(root.dig("children").map(&l_name)).to contain_exactly("開発部", "営業部", "経理部")
      expect(root.dig("children", 0, "children").map(&l_name)).to contain_exactly("金融部", "Web部")
      expect(root.dig("children", 1, "children").map(&l_name)).to contain_exactly("クラサポ部", "販売部")
      expect(root.dig("children", 2, "children").map(&l_name)).to eq([])
    end

    example "SUCCESS: Index departments of ids' subtree" do
      explanation "指定したidsの部署以下の情報のみを返す"

      dev_department = Department.find_by(name: "開発部")

      do_request(ids: [dev_department.id])

      expect(status).to eq(200)

      departments = parse_response_body("departments")
      expect(departments.size).to eq(1)

      root = departments.first
      expect(root.dig("name")).to eq("開発部")
      expect(root.dig("children").map(&l_name)).to contain_exactly("金融部", "Web部")
    end

    example "ERROR: "  # 他のOrganizationの部署を取得しようとするケース
  end
end

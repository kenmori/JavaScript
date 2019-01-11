# frozen_string_literal: true

require "rspec_api_documentation/dsl"
Rails.root.join("spec/acceptance/concerns").each_child { |path| require_dependency(path) }

RSpec.resource "GET /departments", warden: true do
  explanation "departmnets#index"

  include RequestHeaderJson
  include DepartmentDataset

  let(:l_name) { ->(h) { h["name"] } }

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

    login_as(admin_user)
  end

  get "/departments" do
    parameter :ids, "指定した部署以下にある部署の情報を返す。未指定の場合はサインイン中の組織の部署を全て返す", type: :array, items: { type: :integer }
    parameter :show_users, "部署に所属するユーザー情報を含めるかどうかのフラグ。省略した場合はfalse", type: :boolean

    example "SUCCESS: Index departments" do
      explanation "サインインユーザーの組織の部署情報を全て返す"

      do_request

      expect(response_status).to eq(200)

      departments = parse_response_body("departments")
      expect(departments.size).to eq(1)

      root = departments.first
      expect(root.dig("name")).to eq("代表")
      expect(root.dig("children").map(&l_name)).to contain_exactly("開発部", "営業部", "経理部")
      expect(root.dig("children", 0, "children").map(&l_name)).to contain_exactly("金融部", "Web部")
      expect(root.dig("children", 1, "children").map(&l_name)).to contain_exactly("クラサポ部", "販売部")
      expect(root.dig("children", 2, "children").map(&l_name)).to eq([])
    end

    example "SUCCESS: Index departments with users" do
      explanation "部署にユーザー情報を付けて返す"

      do_request(
        show_users: true
      )

      user = parse_response_body("departments", 0, "users", 0)

      expect(user).to include(
        "id"=>admin_user.id,
        "first_name"=>"太郎",
        "last_name"=>"山田",
        "avatar_url"=>nil,
        "disabled"=>false,
        "sign_in_at"=>be_time_iso8601,
        "email"=>"yamada@example.com",
        "is_confirming"=>nil,
        "is_admin"=>true
      )
    end

    example "SUCCESS: Index departments of ids' subtree" do
      explanation "指定したidsの部署以下の情報のみを返す"

      do_request(ids: [dep_1_1.id])

      expect(response_status).to eq(200)

      departments = parse_response_body("departments")
      expect(departments.size).to eq(1)

      root = departments.first
      expect(root.dig("name")).to eq("開発部")
      expect(root.dig("children").map(&l_name)).to contain_exactly("金融部", "Web部")
    end

    example "ERROR: When trying to get department information of another organization" do
      explanation "他の組織の部署を取得しようとする場合エラー"

      do_request(ids: [dep_2.id])

      expect(response_status).to eq(400)

      expect(parse_response_error).to eq(["部署IDは組織内から選択してください"])
    end

    example "ERROR: Singin user is not admin", gaffe: true do
      explanation "サインインユーザがadminではない場合エラー"

      login_as(nomal_user)

      do_request

      expect(response_status).to eq(403)
      expect(parse_response_error).to eq(["許可されていない操作です"])
    end
  end
end

# frozen_string_literal: true

require "rspec_api_documentation/dsl"
Rails.root.join("spec/acceptance/concerns").each_child { |path| require_dependency(path) }

RSpec.resource "GET /departments/current_users", warden: true do
  explanation "departmnets#current_users"

  include RequestHeaderJson
  include DepartmentDataset

  before do
    dep_1
    dep_1_1
    dep_1_1_1
    dep_1_1_2
    dep_1_2
    dep_1_2_1
    dep_1_2_2

    DepartmentMemberFactory.new(department: dep_1, user: nomal_user).create
    DepartmentMemberFactory.new(department: dep_1_1, user: nomal_user).create
    DepartmentMemberFactory.new(department: dep_1_1_1, user: nomal_user).create
    DepartmentMemberFactory.new(department: dep_1_1_2, user: nomal_user).create
  end

  get "/departments/current_users" do
    example "SUCCESS: Return the department information to which the sign-in user belongs" do
      explanation "サインインユーザーが所属する部署情報を返す"

      login_as(nomal_user)

      do_request

      expect(response_status).to eq(200)

      departments = parse_response_body("departments")

      root = departments.first
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

    example "ERROR: When the user do not sign-in" do
      explanation "サインインしていない場合エラー"

      do_request

      expect(response_status).to eq(401)
      expect(parse_response_error).to eq(["アカウント登録もしくはログインしてください。"])
    end
  end
end

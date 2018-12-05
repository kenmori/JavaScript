# frozen_string_literal: true

require "rspec_api_documentation/dsl"
Rails.root.join("spec/acceptance/concerns").each_child { |path| require_dependency(path) }

RSpec.resource "POST /departments", warden: true do
  explanation "departmnets#create"

  include RequestHeaderJson
  include OrganizationDataset

  before do
    login_as(admin_user)
  end

  post "/departments" do
    with_options scope: :department do
      parameter :name, "部署名(最大40文字)", type: :string, required: true
      parameter :display_order, "同じ深さのノード間での表示順", type: :integer, required: true
      parameter :owner_id, "部署責任者ID(サインインユーザーと同じ組織に属していること)", type: :integer, required: true
      parameter :parent_department_id, "親部署ID(サインインユーザーと同じ組織に属していること)", type: :integer
    end

    example "SUCCESS: Create a new department" do
      explanation "新しい部署を作成する"

      do_request(
        department: {
          name: "開発部",
          display_order: 1,
          parent_department_id: nil,
          owner_id: nomal_user.id
        }
      )

      expect(response_status).to eq(201)
      expect(parse_response_body).to include(
        "department" => {
          "id" => a_kind_of(Integer),
          "organization_id" => organization.id,
          "display_order" => 1,
          "name" => "開発部",
          "created_at" => be_time_iso8601,
          "updated_at" => be_time_iso8601
        }
      )
    end

    example "ERROR: Do not input required params" do
      explanation "必須項目を入力しない場合エラー"

      do_request(
        department: {
          name: nil,
          display_order: nil,
          parent_department_id: nil,
          owner_id: nil
        }
      )

      expect(response_status).to eq(400)
      expect(parse_response_error).to include(
        "部署名を入力してください",
        "表示順を入力してください",
        "部署責任者を入力してください"
      )
    end

    example "ERROR: Singin user is not admin", gaffe: true do
      explanation "サインインユーザがadminではない場合エラー"

      login_as(nomal_user)

      do_request(
        department: {
          name: "開発部",
          display_order: 1,
          parent_department_id: nil,
          owner_id: nomal_user.id
        }
      )

      expect(response_status).to eq(403)
      expect(parse_response_error).to eq(["許可されていない操作です"])
    end
  end
end

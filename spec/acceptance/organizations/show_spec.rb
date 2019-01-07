require "rspec_api_documentation/dsl"
Rails.root.join("spec/acceptance/concerns").each_child { |path| require_dependency(path) }

RSpec.resource "GET /organizations", warden: true do
  explanation "organizations#show"

  include RequestHeaderJson
  include DepartmentDataset

  before do
    login_as(admin_user)
  end

  get "/organizations/:id" do
    parameter :id, "組織ID", type: :integer

    example "SUCCESS: get a organization info" do
      explanation "組織情報を取得する"

      dep_1

      do_request(
        id: organization.id
      )

      expect(response_status).to eq(200)
      expect(parse_response_body("organization")).to include(
        "id" => organization.id,
        "name" => "Test",
        "logo" => {"url"=>nil},
        "okr_span" => 3,
        "okr_periods" => [],
        "users" => [
          {
            "id" => admin_user.id,
            "first_name"=> "太郎",
            "last_name"=> "山田",
            "avatar_url"=> nil,
            "disabled"=> false,
            "sign_in_at"=> be_time_iso8601,
            "email"=>"yamada@example.com",
            "is_confirming"=>nil,
            "is_admin"=>true,
            "departments" => [
              {
                "id" => dep_1.id,
                "organization_id" => organization.id,
                "display_order" => 1,
                "name" => "代表",
                "created_at" => be_time_iso8601,
                "updated_at" => be_time_iso8601
              }
            ]
          }
        ]
      )
    end

    example "ERROR: You can not specify an organization different from the sign-in user" do
      explanation "サインインユーザーとは別の組織を指定することは出来ない"

      do_request(
        id: other_org.id
      )

      expect(response_status).to eq(403)
      # TODO エラーの使用が古いので master を rebase して直すこと
      expect(parse_response_body("error")).to eq("許可されていない操作です")
    end
  end
end

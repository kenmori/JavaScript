# frozen_string_literal: true

require "rspec_api_documentation/dsl"
Rails.root.join("spec/acceptance/concerns").each_child { |path| require_dependency(path) }

RSpec.resource "organizations", warden: true do
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
      okr_period
      DepartmentMemberFactory.new(department: dep_1, user: other_user).create

      do_request(
        id: organization.id
      )

      expect(response_status).to eq(200)
      expect(parse_response_body("organization")).to include(
        "id" => organization.id,
        "name" => "Test",
        "logo" => { "url" => nil },
        "okr_span" => 3,
        "okr_periods" => [
          {
            "id" => okr_period.id,
            "name" => "3Q",
            "start_date" => a_kind_of(String),
            "end_date" => a_kind_of(String)
          }
        ],
        "users" => [
          {
            "id" => admin_user.id,
            "first_name" => "太郎",
            "last_name" => "山田",
            "avatar_url" => nil,
            "sign_in_at" => be_time_iso8601,
            "disabled" => false,
            "email" => "yamada@example.com",
            "is_confirming" => nil,
            "is_admin" => true,
            "owner_department_ids" => [dep_1.id],
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
          },
          {
            "id" => other_user.id,
            "first_name" => "園田",
            "last_name" => "次郎",
            "avatar_url" => nil,
            "sign_in_at" => nil,
            "disabled" => false,
            "email" => "other_user@example.com",
            "is_confirming" => nil,
            "is_admin" => false,
            "owner_department_ids" => [],
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
      expect(parse_response_error).to eq(["許可されていない操作です"])
    end
  end
end

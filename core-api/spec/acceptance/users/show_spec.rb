# frozen_string_literal: true

require "rspec_api_documentation/dsl"
Rails.root.join("spec/acceptance/concerns").each_child { |path| require_dependency(path) }

RSpec.resource "users", warden: true do
  include OrganizationDataset
  include RequestHeaderJson

  before do
    okr_period

    login_as(nomal_user)
  end

  get "/users/:id" do
    parameter :id, "詳細情報を取得するユーザID", type: :string, required: true

    example "SUCCESS: Get the user detail" do
      explanation "指定したユーザIDの詳細を取得する"

      do_request(id: nomal_user.id)
      expect(response_status).to eq(200)

      user = parse_response_body("user")
      expect(user).to include(
        "id" => nomal_user.id,
        "last_name" => nomal_user.last_name,
        "first_name" => nomal_user.first_name,
        "avatar_url" => nomal_user.avatar_url,
        "departments" => [],
        "disabled" => false,
        "sign_in_at" => be_time_iso8601,
        "email" => nomal_user.email,
        "is_confirming" => nil,
        "is_admin" => false,
        "setting" => {
          "notify_remind_email_enabled" => true,
          "show_child_objectives" => true,
          "show_disabled_okrs" => false,
          "show_member_key_results" => true,
          "show_objective_key_results" => true
        },
        "organization" => {
          "id" => organization.id,
          "name" => organization.name,
          "okr_span" => organization.okr_span,
          "slack_enabled" => false,
          "logo" => {
            "url" => nil
          },
          "current_okr_period" => {
            "id" => okr_period.id,
            "start_date" => okr_period.start_date.strftime("%Y-%m-%d"),
            "end_date" => okr_period.end_date.strftime("%Y-%m-%d"),
            "name" => okr_period.name
          },
          "owner" => {
            "id" => nomal_user.id,
            "email" => nomal_user.email,
            "first_name" => nomal_user.first_name,
            "last_name" => nomal_user.last_name,
            "is_admin" => false,
            "is_confirming" => nil,
            "disabled" => false,
            "avatar_url" => nil,
            "departments" => [],
            "sign_in_at" => be_time_iso8601
          }
        }
      )
    end

    example "SUCCESS: Getable other user detail when admin user" do
      explanation "管理者ユーザの場合他ユーザIDの詳細を取得出来る"

      login_as(admin_user)
      do_request(id: nomal_user.id)
      expect(response_status).to eq(200)

      user = parse_response_body("user")
      expect(user).to include(
        "id" => nomal_user.id,
        "last_name" => nomal_user.last_name,
        "first_name" => nomal_user.first_name,
        "avatar_url" => nomal_user.avatar_url,
        "departments" => [],
        "disabled" => false,
        "sign_in_at" => be_time_iso8601,
        "email" => nomal_user.email,
        "is_confirming" => nil,
        "is_admin" => false,
        "setting" => {
          "notify_remind_email_enabled" => true,
          "show_child_objectives" => true,
          "show_disabled_okrs" => false,
          "show_member_key_results" => true,
          "show_objective_key_results" => true
        },
        "organization" => {
          "id" => organization.id,
          "name" => organization.name,
          "okr_span" => organization.okr_span,
          "slack_enabled" => false,
          "logo" => {
            "url" => nil
          },
          "current_okr_period" => {
            "id" => okr_period.id,
            "start_date" => okr_period.start_date.strftime("%Y-%m-%d"),
            "end_date" => okr_period.end_date.strftime("%Y-%m-%d"),
            "name" => okr_period.name
          },
          "owner" => {
            "id" => nomal_user.id,
            "email" => nomal_user.email,
            "first_name" => nomal_user.first_name,
            "last_name" => nomal_user.last_name,
            "is_admin" => false,
            "is_confirming" => nil,
            "disabled" => false,
            "avatar_url" => nil,
            "departments" => [],
            "sign_in_at" => be_time_iso8601
          }
        }
      )
    end

    example "SUCCESS: Get myself detail" do
      explanation "自身の詳細を取得する"

      do_request(id: "me")
      expect(response_status).to eq(200)

      user = parse_response_body("user")
      expect(user).to include(
        "id" => nomal_user.id,
        "last_name" => nomal_user.last_name,
        "first_name" => nomal_user.first_name,
        "avatar_url" => nomal_user.avatar_url,
        "departments" => [],
        "disabled" => false,
        "sign_in_at" => be_time_iso8601,
        "email" => nomal_user.email,
        "is_confirming" => nil,
        "is_admin" => false,
        "setting" => {
          "notify_remind_email_enabled" => true,
          "show_child_objectives" => true,
          "show_disabled_okrs" => false,
          "show_member_key_results" => true,
          "show_objective_key_results" => true
        },
        "organization" => {
          "id" => organization.id,
          "name" => organization.name,
          "okr_span" => organization.okr_span,
          "slack_enabled" => false,
          "logo" => {
            "url" => nil
          },
          "current_okr_period" => {
            "id" => okr_period.id,
            "start_date" => okr_period.start_date.strftime("%Y-%m-%d"),
            "end_date" => okr_period.end_date.strftime("%Y-%m-%d"),
            "name" => okr_period.name
          },
          "owner" => {
            "id" => nomal_user.id,
            "email" => nomal_user.email,
            "first_name" => nomal_user.first_name,
            "last_name" => nomal_user.last_name,
            "is_admin" => false,
            "is_confirming" => nil,
            "disabled" => false,
            "avatar_url" => nil,
            "departments" => [],
            "sign_in_at" => be_time_iso8601
          }
        }
      )
    end

    example "ERROR: Can not specification when does not exists user ID" do
      explanation "存在しないユーザIDは指定出来ない"

      do_request(id: 0)
      expect(response_status).to eq(403)
    end

    example "ERROR: Non-administrator can not specify other user" do
      explanation "管理者以外は他ユーザIDの指定が出来ない"

      do_request(id: admin_user.id)
      expect(response_status).to eq(403)
    end

    example "ERROR: Can not specification different organization" do
      explanation "異なる組織のユーザIDは指定出来ない"

      login_as(admin_user)
      do_request(id: other_org_user.id)

      expect(response_status).to eq(403)
      expect(parse_response_error).to eq(["許可されていない操作です"])
    end
  end
end

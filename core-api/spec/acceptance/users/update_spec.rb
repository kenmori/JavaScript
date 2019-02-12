# frozen_string_literal: true

require "rspec_api_documentation/dsl"
Rails.root.join("spec/acceptance/concerns").each_child { |path| require_dependency(path) }

RSpec.resource "users", warden: true, gaffe: true do
  include RequestHeaderJson
  include DepartmentDataset

  before do
    dep_1
    login_as(admin_user)
  end

  patch "/users/:id" do
    parameter :id, "ユーザID", type: :integer, required: true
    with_options scope: :user do
      parameter :id, "ユーザID", type: :integer, required: true
      parameter :first_name, "ユーザ名(名)", type: :string
      parameter :last_name, "ユーザ名(姓)", type: :string
      parameter :email, "メールアドレス", type: :string
      parameter :avatar, "アバター画像", type: :file
      parameter :admin, "管理者フラグ", type: :boolean
      parameter :department_ids, "所属部署ID", type: :array, items: { type: :integer }
    end

    example "SUCCESS: change user info" do
      explanation "ユーザ情報を変更する"

      do_request(
        id: admin_user.id,
        user: {
          id: admin_user.id,
          first_name: "Q太郎",
          last_name: "空条",
          email: "kujo-q@example.com",
          avatar: nil, # avatar画像を渡したいが Rack::Test::UploadedFile がうまく動かない
          admin: false,
          department_ids: [dep_1.id]
        }
      )

      expect(response_status).to eq(200)
      expect(parse_response_body("user")).to include(
        "id" => a_kind_of(Integer),
        "first_name" => "Q太郎",
        "last_name" => "空条",
        "avatar_url" => nil,
        "disabled" => false,
        "sign_in_at" => be_time_iso8601,
        "email" => "kujo-q@example.com",
        "is_confirming" => "kujo-q@example.com",
        "is_admin" => false,
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
      )
    end

    example "Can edit myself information even if you are not an administrator" do
      explanation "管理者でなくても自分の情報は編集できる"

      login_as(nomal_user)

      do_request(
        id: nomal_user.id,
        user: {
          id: nomal_user.id,
          last_name: "空条"
        }
      )

      expect(response_status).to eq(200)
      expect(parse_response_body("user", "last_name")).to eq("空条")
    end

    example "If you are not an administrator, you can not edit information other than yourself" do
      explanation "管理者でない場合、自分以外の情報を編集できない"

      login_as(nomal_user)

      do_request(
        id: other_user.id,
        user: {
          id: other_user.id,
          last_name: "空条"
        }
      )

      expect(response_status).to eq(403)
      expect(parse_response_error).to include("許可されていない操作です")
    end

    example "ERROR: Users in different organizations can not edit" do
      explanation "異なる組織のユーザーは編集できない"

      do_request(
        id: other_org_user.id,
        user: {
          id: other_org_user.id,
          last_name: "その他"
        }
      )

      expect(response_status).to eq(403)
      expect(parse_response_error).to include("許可されていない操作です")
    end
  end
end

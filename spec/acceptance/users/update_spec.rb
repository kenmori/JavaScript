require "rspec_api_documentation/dsl"
Rails.root.join("spec/acceptance/concerns").each_child { |path| require_dependency(path) }

RSpec.resource "PATCH /users/:id", warden: true, gaffe: true do
  explanation "users#update"

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
      parameter :department_id, "所属部署ID", type: :integer
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
          avatar: nil,  # avatar画像を渡したいが Rack::Test::UploadedFile がうまく動かない
          admin: false,
          department_id: [dep_1.id],
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
        "is_confirming"=>"kujo-q@example.com",
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

    example "ERROR: TODO"
  end
end

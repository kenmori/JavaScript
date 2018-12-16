require "rspec_api_documentation/dsl"
Rails.root.join("spec/acceptance/concerns").each_child { |path| require_dependency(path) }

RSpec.resource "POST /users", warden: true do
  explanation "users#create"

  include RequestHeaderJson
  include DepartmentDataset

  before do
    dep_1
    login_as(admin_user)
  end

  post "/users" do
    with_options scope: :user do
      parameter :first_name, "ユーザ名(名)", type: :string, required: true
      parameter :last_name, "ユーザ名(姓)", type: :string, required: true
      parameter :email, "メールアドレス", type: :string, required: true
      parameter :admin, "管理者かどうかを設定", type: :boolean, required: true
      parameter :skip_notification, "メール認証をスキップするかどうかを設定", type: :boolean, required: true
      parameter :department_id, "所属させる部署のID", type: :integer, required: true
    end

    example "SUCCESS:" do
      explanation "サインイン中のユーザの組織に新しくユーザを追加する"

      do_request(
        user: {
          first_name: "Q太郎",
          last_name: "空条",
          email: "jojo-q@example.com",
          admin: false,
          skip_notification: false,
          department_id: dep_1.id
        }
      )

      expect(response_status).to eq(201)
      expect(parse_response_body("user")).to include(
        "id" => a_kind_of(Integer),
        "first_name" => "Q太郎",
        "last_name" => "空条",
        "avatar_url" => nil,
        "disabled" => false,
        "sign_in_at" => nil,
        "email" => "jojo-q@example.com",
        "is_confirming" => true,
        "is_admin" => false
      )

      user = User.find_by(email: "jojo-q@example.com")
      expect(user.departments).to eq([dep_1])
    end
  end
end

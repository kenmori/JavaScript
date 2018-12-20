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
      parameter :password, "(未使用)", type: :string
      parameter :remove_avatar, "(未使用?)", type: :string
      parameter :admin, "管理者フラグ", type: :boolean
      # parameter :department_id, "所属させる部署のID", type: :integer
    end

    example "SUCCESS: change first_name" do
      explanation "ユーザ名(名)を変更する"

      do_request(
        id: admin_user.id,
        user: {
          id: admin_user.id,
          first_name: "Qtaro"
        }
      )

      expect(response_status).to eq(200)
      expect(parse_response_body("user")).to include(
        "id" => a_kind_of(Integer),
        "first_name" => "Qtaro",
        "last_name" => "山田",
        "avatar_url" => nil,
        "disabled" => false,
        "sign_in_at" => be_time_iso8601,
        "email" => "yamada@example.com",
        "is_confirming" => nil,
        "is_admin" => true,
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

    example "SUCCESS: change last_name" do
      explanation "ユーザ名(姓)を変更する"

      do_request(
        id: admin_user.id,
        user: {
          id: admin_user.id,
          last_name: "Kujo"
        }
      )

      expect(response_status).to eq(200)
      expect(parse_response_body("user", "last_name")).to eq("Kujo")
    end

    example "SUCCESS: change email" do
      explanation "メールアドレスを変更する"

      do_request(
        id: admin_user.id,
        user: {
          id: admin_user.id,
          email: "change@example.com"
        }
      )

      expect(response_status).to eq(200)
      expect(parse_response_body("user", "email")).to eq("change@example.com")
    end

    example "SUCCESS: change avatar image" do
      pending "FIXME Rack::Test::UploadedFileによる画像アップロードがうまく出来ない"

      explanation "アバター画像を変更する"

      do_request(
        id: admin_user.id,
        user: {
          id: admin_user.id,
          avatar: Rack::Test::UploadedFile.new(fixture_path.join('images/user.jpg'), "image/jpg")
        }
      )

      expect(response_status).to eq(200)
      expect(parse_response_body("user", "avatar")).to be_truthy
    end

    example "SUCCESS: change admin flag" do
      explanation "管理者フラグを変更する"

      do_request(
        id: admin_user.id,
        user: {
          id: admin_user.id,
          admin: false
        }
      )

      expect(response_status).to eq(200)
      expect(parse_response_body("user", "is_admin")).to be_falsey
    end

    example "SUCCESS: change department" do

    end


  #   example "SUCCESS: Add a new user to the organization of the signed-in user" do
  #     explanation "サインイン中のユーザの組織に新しくユーザを追加する"

  #     do_request(
  #       user: {
  #         first_name: "Q太郎",
  #         last_name: "空条",
  #         email: "jojo-q@example.com",
  #         admin: false,
  #         skip_notification: false,
  #         department_id: dep_1.id
  #       }
  #     )

  #     expect(response_status).to eq(201)
  #     expect(parse_response_body("user")).to include(
  #       "id" => a_kind_of(Integer),
  #       "first_name" => "Q太郎",
  #       "last_name" => "空条",
  #       "avatar_url" => nil,
  #       "disabled" => false,
  #       "sign_in_at" => nil,
  #       "email" => "jojo-q@example.com",
  #       "is_confirming" => true,
  #       "is_admin" => false
  #     )

  #     user = User.find_by(email: "jojo-q@example.com")
  #     expect(user.departments).to eq([dep_1])
  #   end

  #   example "ERROR: Error when there is no required params" do
  #     explanation "必須項目がない場合エラー"

  #     do_request(
  #       user: {
  #         first_name: nil,
  #         last_name: nil,
  #         email: nil,
  #         admin: nil,
  #         skip_notification: nil,
  #         department_id: nil
  #       }
  #     )

  #     expect(response_status).to eq(422)
  #     expect(parse_response_body("error")).to eq(
  #       "メールアドレスを入力してください, メールアドレスは不正な値です, ユーザー名 (名) を入力してください, ユーザー名 (姓) を入力してください"
  #     )
  #   end

  #   example "ERROR: When not entering department id" do
  #     explanation "部署IDを入力しない場合エラー"

  #     do_request(
  #       user: {
  #         first_name: "Q太郎",
  #         last_name: "空条",
  #         email: "jojo-q@example.com",
  #         admin: false,
  #         skip_notification: false,
  #         department_id: nil
  #       }
  #     )

  #     expect(response_status).to eq(404)
  #     expect(parse_response_error).to eq(["操作の対象が存在しません"])
  #   end

  #   example "ERROR: Cannot specify a department of another organization" do
  #     explanation "別の組織の部署は指定できない"

  #     do_request(
  #       user: {
  #         first_name: "Q太郎",
  #         last_name: "空条",
  #         email: "jojo-q@example.com",
  #         admin: false,
  #         skip_notification: false,
  #         department_id: dep_2.id
  #       }
  #     )

  #     expect(response_status).to eq(404)
  #     expect(parse_response_error).to eq(["操作の対象が存在しません"])
  #   end
  end
end

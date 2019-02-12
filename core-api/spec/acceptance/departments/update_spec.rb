# frozen_string_literal: true

require "rspec_api_documentation/dsl"
Rails.root.join("spec/acceptance/concerns").each_child { |path| require_dependency(path) }

RSpec.resource "departments", warden: true do
  include RequestHeaderJson
  include OrganizationDataset

  let!(:department) do
    DepartmentFactory.new(
      organization: organization,
      owner: admin_user
    ).create
  end

  before do
    login_as(admin_user)
  end

  patch "/departments/:id" do
    parameter :id, "変更対象の部署ID(サインインユーザーと同じ組織に属していること)", type: :integer, required: true
    with_options scope: :department do
      parameter :name, "部署名(最大40文字)", type: :string
      parameter :display_order, "同じ深さのノード間での表示順", type: :integer
      parameter :parent_department_id, "親部署ID(サインインユーザーと同じ組織に属していること)", type: :integer
      parameter :owner_id, "部署責任者ID(サインインユーザーと同じ組織に属していること)。0を指定した場合は削除する", type: :integer
    end

    example "SUCCESS: Update a department" do
      explanation "部署を更新する"

      do_request(
        id: department.id,
        department: {
          name: "開発部",
          display_order: 2,
          parent_department_id: nil,
          owner_id: nomal_user.id
        }
      )

      expect(response_status).to eq(200)
      expect(parse_response_body).to include(
        "department" => {
          "id" => a_kind_of(Integer),
          "organization_id" => organization.id,
          "display_order" => 2,
          "name" => "開発部",
          "created_at" => be_time_iso8601,
          "updated_at" => be_time_iso8601
        }
      )
    end

    example "ERROR: if name is empty" do
      explanation "名前が空の場合エラー"

      do_request(
        id: department.id,
        department: {
          name: ""
        }
      )

      expect(response_status).to eq(400)
      expect(parse_response_error).to include(
        "部署名を入力してください"
      )
    end

    example "ERROR: Singin user is not admin", gaffe: true do
      explanation "サインインユーザがadminではない場合エラー"

      login_as(nomal_user)

      do_request(
        id: department.id,
        department: {
          name: "開発部",
          display_order: 2,
          parent_department_id: nil,
          owner_id: nomal_user.id
        }
      )

      expect(response_status).to eq(403)
      expect(parse_response_error).to eq(["許可されていない操作です"])
    end
  end
end

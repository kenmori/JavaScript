require "rspec_api_documentation/dsl"
Rails.root.join("spec/acceptance/concerns").each_child { |path| require_dependency(path) }

RSpec.resource "POST /departments", warden: true do
  explanation "departmnets#create"

  include RequestHeaderJson
  include OrganizationDataset

  before do
    login_as(admin_user)
  end

  post "/departments", focus: true do
    with_options scope: :department do
      parameter :name, "部署名", type: :string, required: true
      parameter :owner_id, "部署責任者ID", type: :integer, required: true
      parameter :department_id, "親部署ID", type: :integer
    end

    example "SUCCESS:" do
      # NOTE
      # admin_userしか部署は操作できない
      # 同じOrganizationに属しているユーザをowner id に指定する
      # department id も同じorganizationである必要がある

      do_request(
        department: {
          name: "開発部",
          owner_id: login_user.id,
          department_id: nil,
          display_order: 0
        }
      )

      expect(status).to eq(201)
      # TODO ちゃんとかく
      pp parse_response_body
    end

    example "ERROR:"
  end
end

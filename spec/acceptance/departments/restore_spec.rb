require "rspec_api_documentation/dsl"
Rails.root.join("spec/acceptance/concerns").each_child { |path| require_dependency(path) }

RSpec.resource "PATCH /departments/:id/restore", warden: true do
  explanation "departmnets#restore"

  include RequestHeaderJson

  let!(:organization) { OrganizationFactory.new.create }
  let!(:admin_user) { UserFactory.new(organization: organization).create(admin: true) }
  let!(:department) {
    DepartmentFactory.new(
      organization: organization,
      owner: admin_user
    ).create_archived
  }

  before do
    login_as(admin_user)
  end

  patch "/departments/:id/restore" do
    parameter :id, "リストアする部署のID", type: :integer, required: true

    example "SUCCESS: Restore a department" do
      explanation "部署をリストア(有効化)する"

      do_request(id: department.id)

      expect(response_status).to eq(204)
      expect(parse_response_body).to be_blank

      department.reload
      expect(department).to be_active
    end

    context "他の組織の部署が存在する場合" do
      let!(:other_org) { OrganizationFactory.new.create(name: "other") }
      let!(:other_org_user) do
        UserFactory.new(organization: other_org).create(
          last_name: "花京院",
          first_name: "典明",
          email: "other_org_user@example.com",
          admin: true
        )
      end
      let!(:other_org_department) do
        DepartmentFactory.new(organization: other_org, owner: other_org_user).create(
          name: "企画部",
          display_order: 1
        )
      end

      example "ERROR: A department of another organization can not be restored" do
        explanation "別の組織の部署はリストア出来ない"

        do_request(id: other_org_department.id)

        expect(response_status).to eq(403)
        expect(parse_response_error).to include("許可されていない操作です")
      end
    end
  end
end

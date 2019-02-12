# frozen_string_literal: true

require "rspec_api_documentation/dsl"
Rails.root.join("spec/acceptance/concerns").each_child { |path| require_dependency(path) }

RSpec.resource "departments", warden: true do
  include RequestHeaderJson
  include DepartmentDataset

  before do
    dep_1_1_1

    login_as(admin_user)
  end

  delete "/departments/:id" do
    parameter :id, "アーカイブする部署のID", type: :integer, required: true

    example "SUCCESS: Archive a department" do
      explanation "部署をアーカイブ(無効化)する"

      dep_1_1_1.department_members.destroy_all

      do_request(id: dep_1_1_1.id)

      expect(response_status).to eq(204)
      expect(parse_response_body).to be_blank
    end

    example "ERROR: Can not archive if there is lower level departments" do
      explanation "下位部署がある場合アーカイブ(無効化)できない"

      do_request(id: dep_1_1.id)

      expect(response_status).to eq(400)
      expect(parse_response_error).to include("下位部署が存在するのでアーカイブ出来ません")
    end
  end
end

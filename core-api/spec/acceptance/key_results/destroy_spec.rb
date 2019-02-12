# frozen_string_literal: true

require "rspec_api_documentation/dsl"
Rails.root.join("spec/acceptance/concerns").each_child { |path| require_dependency(path) }

RSpec.resource "key_results", warden: true do
  include OrganizationDataset
  include RequestHeaderJson

  before do
    login_as(admin_user)
  end

  delete "/key_results/:id" do
    parameter :id, "削除対象とするKeyResultのID", type: :integer, required: true

    example "SUCCESS: delete key_result" do
      explanation "Objective責任者であればKeyResultを削除することができる"

      do_request(id: key_result.id)

      expect(response_status).to eq(200)
      expect(parse_response_body("key_result", "id")).to eq(key_result.id)

      expect(KeyResult.find_by(id: key_result.id)).to be_nil
    end

    example "ERROR: When KeyResult is a different organization from the sign-in user" do
      explanation "KeyResultがサインインユーザーとは別のOrganizationの場合エラー"

      do_request(id: other_org_key_result.id)

      expect(response_status).to eq(403)
      expect(parse_response_error).to eq(["許可されていない操作です"])
    end

    example "ERROR: When the sign-in user is not an objective owner" do
      explanation "サインインユーザーがObjective責任者ではない場合エラー"

      login_as(nomal_user)

      do_request(id: key_result.id)

      expect(response_status).to eq(403)
      expect(parse_response_error).to eq(["Objective 責任者のみ削除できます"])
    end
  end
end

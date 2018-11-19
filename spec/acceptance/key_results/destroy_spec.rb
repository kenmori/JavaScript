# frozen_string_literal: true

require "rspec_api_documentation/dsl"
Rails.root.join("spec/acceptance/concerns").each_child { |path| require_dependency(path) }

RSpec.resource "DELETE /key_results/:id", warden: true do
  explanation "key_results#destroy"

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
    end

    example "ERROR: KeyResultがサインインユーザーとは別のOrganizationのとき"
    example "ERROR: Objective責任者ではないとき"
    example "ERROR: 何か削除できない時(unprocessable_entity_with_errorsにいくとき)"
  end
end

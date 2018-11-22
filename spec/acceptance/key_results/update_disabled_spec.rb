# frozen_string_literal: true

require "rspec_api_documentation/dsl"
Rails.root.join("spec/acceptance/concerns").each_child { |path| require_dependency(path) }

RSpec.resource "PUT /key_results/:id/disable", warden: true do
  explanation "key_results#update_disabled KeyResultを無効化/有効化する"

  include OrganizationDataset
  include RequestHeaderJson

  before do
    login_as(admin_user)
  end

  put "/key_results/:id/disable" do
    parameter :id, "更新対象とするKeyResultのID", type: :integer, required: true
    parameter :disabled, "trueの場合無効化、falseの場合有効化する。省略した場合無効化する。", type: :boolean

    example "SUCCESS: do disable the key reuslt" do
      explanation "指定した KeyReuslt を無効化する"

      do_request(
        id: key_result.id,
        disabled: true
      )

      expect(response_status).to eq(200)
      expect(parse_response_body("key_result")).to include(
        "id" => key_result.id,
        "disabled" => true
      )
    end

    example "SUCCESS: do enable the key reuslt" do
      explanation "指定した KeyReuslt を有効化する"

      key_result.disabled_at = 2.day.ago
      key_result.save(validate: false)

      do_request(
        id: key_result.id,
        disabled: false
      )

      expect(response_status).to eq(200)
      expect(parse_response_body("key_result")).to include(
        "id" => key_result.id,
        "disabled" => false
      )
    end

    example "ERROR: When the sign-in user is not the Objective manager or Key Result manager" do
      explanation "サインインユーザが Objective 責任者または Key Result 責任者ではない場合エラー"

      login_as(nomal_user)

      do_request(
        id: key_result.id
      )

      expect(response_status).to eq(403)
      expect(parse_response_body("error")).to eq("Objective 責任者または Key Result 責任者のみ編集できます")
    end

    example "ERROR: When KeyResult is a different organization from the sign-in user" do
      explanation "KeyResultがサインインユーザーとは別のOrganizationの場合エラー"

      do_request(id: other_org_key_result.id)

      expect(response_status).to eq(403)
      expect(parse_response_body("error")).to eq("許可されていない操作です")
    end
  end
end

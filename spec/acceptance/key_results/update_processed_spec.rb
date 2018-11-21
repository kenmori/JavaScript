# frozen_string_literal: true

require "rspec_api_documentation/dsl"
Rails.root.join("spec/acceptance/concerns").each_child { |path| require_dependency(path) }

RSpec.resource "PUT /key_results/:id/process", warden: true do
  explanation "key_results#update_processed 指定したKeyResultをサインインユーザーが着手した状態にする"

  include OrganizationDataset
  include RequestHeaderJson

  before do
    login_as(nomal_user)
  end

  put "/key_results/:id/process" do
    parameter :id, "着手するKeyResultのID", type: :integer, required: true

    example "SUCCESS: Make the specified KeyResult under the condition that the sign-in user has started" do
      explanation "指定したKeyResultをサインインユーザーが着手した状態にする"

      key_result.key_result_members.create(
        user: nomal_user,
        role: :member
      )

      do_request(
        id: key_result.id
      )

      expect(response_status).to eq(204)
      expect(response_body).to be_empty
    end

    example "ERROR: ログインユーザがKeyResultのメンバーでない場合エラー"
    example "ERROR:"
  end
end

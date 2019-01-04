# frozen_string_literal: true

require "rspec_api_documentation/dsl"
Rails.root.join("spec/acceptance/concerns").each_child { |path| require_dependency(path) }

RSpec.resource "PUT /key_results/:id/process", warden: true do
  explanation "key_results#update_processed 指定したKeyResultをサインインユーザーが着手した状態にする"

  include OrganizationDataset
  include RequestHeaderJson

  before do
    # NOTE nomal_user を key_result の関係者として登録
    KeyResultMemberFactory.new(key_result: key_result, user: nomal_user).create

    login_as(nomal_user)
  end

  put "/key_results/:id/process" do
    parameter :id, "着手するKeyResultのID", type: :integer, required: true

    example "SUCCESS: Make the specified KeyResult under the condition that the sign-in user has started" do
      explanation "指定したKeyResultをサインインユーザーが着手した状態にする"

      do_request(
        id: key_result.id
      )

      expect(response_status).to eq(204)
      expect(response_body).to be_empty
    end

    example "ERROR: Error when sign-in user is not a member of KeyResult" do
      explanation "サインインユーザがKeyResultのメンバーでない場合エラー"

      login_as(other_user)

      do_request(id: key_result.id)

      expect(response_status).to eq(403)
      expect(parse_response_error).to eq(["Key Result 責任者または関係者のみ編集できます"])
    end

    example "ERROR: When owner id is different organization" do
      explanation "異なる組織のユーザーを責任者とする場合エラー"

      do_request(id: other_org_key_result.id)

      expect(response_status).to eq(403)
      expect(parse_response_error).to eq(["許可されていない操作です"])
    end
  end
end

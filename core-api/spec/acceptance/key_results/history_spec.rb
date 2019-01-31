# frozen_string_literal: true

require "rspec_api_documentation/dsl"
Rails.root.join("spec/acceptance/concerns").each_child { |path| require_dependency(path) }

RSpec.resource "GET /key_results/:id/histories", warden: true do
  explanation "key_results#history"

  include OrganizationDataset
  include RequestHeaderJson

  before do
    login_as(admin_user)
  end

  let(:target) { KeyResultFactory.new(user: admin_user, objective: objective).create }

  get "/key_results/:id/histories" do
    parameter :id, "KeyResult ID", type: :integer, required: true

    example "SUCCESS: Get the keyresult histories" do
      explanation "指定したKeyResult IDの変更履歴を取得する"

      PaperTrail.request.whodunnit = admin_user.id
      target.update!(name: "[UPDATED-1] KeyResult")
      travel 1.day
      target.update!(name: "[UPDATED-2] KeyResult")
      travel 1.day
      normal_comment = CommentFactory.new(key_result: target, user: admin_user).create
      travel 1.day
      label = KeyResultCommentLabelFactory.new(organization: organization).create
      label_comment = CommentFactory.new(key_result: target, user: admin_user, key_result_comment_label: label).create
      travel_back

      do_request(id: target.id)
      expect(response_status).to eq(200)

      expect(parse_response_body).to include(
        "histories" => [
          {
            "created_at" => be_time_iso8601,
            "type" => "comment",
            "diffs" => [{
              "column" => label_comment.key_result_comment_label.name,
              "before" => "",
              "after" => label_comment.text
            }],
            "user" => {
              "id" => admin_user.id,
              "first_name" => admin_user.first_name,
              "last_name" => admin_user.last_name,
              "email" => admin_user.email,
              "avatar_url" => nil,
              "is_admin" => true,
              "is_confirming" => nil,
              "disabled" => false,
              "sign_in_at" => be_time_iso8601
            }
          },
          {
            "created_at" => be_time_iso8601,
            "type" => "comment",
            "diffs" => [{
              "column" => normal_comment.model_name.human,
              "before" => "",
              "after" => normal_comment.text
            }],
            "user" => {
              "id" => admin_user.id,
              "first_name" => admin_user.first_name,
              "last_name" => admin_user.last_name,
              "email" => admin_user.email,
              "avatar_url" => nil,
              "is_admin" => true,
              "is_confirming" => nil,
              "disabled" => false,
              "sign_in_at" => be_time_iso8601
            }
          },
          {
            "created_at" => be_time_iso8601,
            "type" => "key_result_version",
            "diffs" => [{
              "column" => "Key Result",
              "before" => target.versions.last.reify.name,
              "after" => "[UPDATED-2] KeyResult"
            }],
            "user" => {
              "id" => admin_user.id,
              "first_name" => admin_user.first_name,
              "last_name" => admin_user.last_name,
              "email" => admin_user.email,
              "avatar_url" => nil,
              "is_admin" => true,
              "is_confirming" => nil,
              "disabled" => false,
              "sign_in_at" => be_time_iso8601
            }
          },
          {
            "created_at" => be_time_iso8601,
            "type" => "key_result_version",
            "diffs" => [{
              "column" => "Key Result",
              "before" => target.versions.first.reify.name,
              "after" => "[UPDATED-1] KeyResult"
            }],
            "user" => {
              "id" => admin_user.id,
              "first_name" => admin_user.first_name,
              "last_name" => admin_user.last_name,
              "email" => admin_user.email,
              "avatar_url" => nil,
              "is_admin" => true,
              "is_confirming" => nil,
              "disabled" => false,
              "sign_in_at" => be_time_iso8601
            }
          }
        ]
      )
    end

    example "ERROR: Can not specification when does not exists keyresult ID" do
      explanation "存在しないObjective IDは指定出来ない"

      do_request(id: 0)
      expect(response_status).to eq(400)
    end

    example "ERROR: Can not specification different organization" do
      explanation "異なる組織のObjective IDは指定出来ない"

      do_request(id: other_org_key_result.id)

      expect(response_status).to eq(403)
      expect(parse_response_error).to eq(["許可されていない操作です"])
    end
  end
end

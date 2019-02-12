# frozen_string_literal: true

require "rspec_api_documentation/dsl"
Rails.root.join("spec/acceptance/concerns").each_child { |path| require_dependency(path) }

RSpec.resource "objectives", warden: true do
  include OrganizationDataset
  include RequestHeaderJson

  before do
    login_as(admin_user)
  end

  let(:target) { ObjectiveFactory.new(user: admin_user, okr_period: okr_period).create }

  get "/objectives/:id/histories" do
    parameter :id, "Objective ID", type: :integer, required: true

    example "SUCCESS: Get the objective histories" do
      explanation "指定したObjective IDの変更履歴を取得する"

      PaperTrail.request.whodunnit = admin_user.id
      target.update!(name: "[UPDATED-1] Objective")
      travel 1.day
      target.update!(name: "[UPDATED-2] Objective")
      travel 1.day
      comment = ObjectiveCommentFactory.new(objective: target, user: admin_user).create
      travel_back

      do_request(id: target.id)
      expect(response_status).to eq(200)

      expect(parse_response_body).to include(
        "histories" => [
          {
            "created_at" => be_time_iso8601,
            "type" => "objective_comment",
            "diffs" => [{
              "column" => comment.model_name.human,
              "before" => "",
              "after" => comment.text
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
            "type" => "objective_version",
            "diffs" => [{
              "column" => "Objective",
              "before" => target.versions.last.reify.name,
              "after" => "[UPDATED-2] Objective"
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
            "type" => "objective_version",
            "diffs" => [{
              "column" => "Objective",
              "before" => target.versions.first.reify.name,
              "after" => "[UPDATED-1] Objective"
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

    example "ERROR: Can not specification when does not exists objective ID" do
      explanation "存在しないObjective IDは指定出来ない"

      do_request(id: 0)
      expect(response_status).to eq(400)
    end

    example "ERROR: Can not specification different organization" do
      explanation "異なる組織のObjective IDは指定出来ない"

      do_request(id: other_org_objective.id)

      expect(response_status).to eq(403)
      expect(parse_response_error).to eq(["許可されていない操作です"])
    end
  end
end

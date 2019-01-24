# frozen_string_literal: true

require "rspec_api_documentation/dsl"
Rails.root.join("spec/acceptance/concerns").each_child { |path| require_dependency(path) }

RSpec.resource "POST /objectives", warden: true do
  explanation "objectives#create"

  include DepartmentDataset
  include RequestHeaderJson

  before do
    login_as(admin_user)
  end

  post "/objectives" do
    with_options scope: :objective do
      parameter :name, "名前", type: :string, required: true
      parameter :description, "説明", type: :string
      parameter :parent_key_result_id, "上位KeyResult ID", type: :integer
      parameter :okr_period_id, "OkrPeriod ID",  type: :integer, required: true
      parameter :owner_id, "責任者ID", type: :integer, required: true
      parameter :department_id, "部署ID", type: :integer, required: true
    end

    example "SUCCESS: create a new Objective" do
      explanation "新しいObjectiveを作成する"

      do_request(
        "objective" => {
          "name" => "業界一位になる",
          "description" => "他社を追い抜き業界一位になる",
          "parent_key_result_id" => nil,
          "okr_period_id" => okr_period.id,
          "owner_id" => admin_user.id,
          "department_id" => dep_1.id
        }
      )

      expect(response_status).to eq(201)
      expect(parse_response_body("objective")).to include(
        "id" => a_kind_of(Integer),
        "name" => "業界一位になる",
        "description" => "他社を追い抜き業界一位になる",
        "okr_period_id" => okr_period.id,
        "progress_rate" => 0,
        "parent_key_result_id" => nil,
        "updated_at" => be_time_iso8601,
        "key_result_order" => nil,
        "disabled" => false,
        "result" => nil,
        "is_full" => true,
        "key_result_ids" => [],
        "owner" => {
          "id" => admin_user.id,
          "first_name" => "太郎",
          "last_name" => "山田",
          "avatar_url" => nil,
          "disabled" => false
        },
        "key_results" => [],
        "sub_progress_rate" => nil,
        "comments" => [],
        "department" => {
          "organization_id" => organization.id,
          "id" => dep_1.id,
          "name" => "代表",
          "display_order" => 1,
          "updated_at" => be_time_iso8601,
          "created_at" => be_time_iso8601
        }
      )
    end
  end
end

# frozen_string_literal: true

require "rspec_api_documentation/dsl"
Rails.root.join("spec/acceptance/concerns").each_child { |path| require_dependency(path) }

RSpec.resource "GET /key_results/unprocessed", warden: true do
  explanation "key_results#index_unprocessed"

  include OrganizationDataset
  include RequestHeaderJson

  before do
    login_as(nomal_user)
  end

  get "/key_results/unprocessed" do
    parameter :user_id, "サインインユーザと同じ組織のユーザーID", type: :integer, required: true
    parameter :okr_period_id, "取得したいOKR期間のID", type: :integer, required: true

    example "SUCCESS: When specifying a user with KeyResults that have not started" do
      explanation <<~EOF
        user_idがサインインユーザと同じ組織のユーザであれば、そのユーザが着手していないKeyResults一覧を取得することができる。
        Objectiveのownerが作成したKeyResultは自動的にownerであるユーザが着手していることになる。
      EOF

      do_request(
        user_id: other_user.id,
        okr_period_id: okr_period.id
      )

      expect(response_status).to eq(200)

      key_results = parse_response_body("key_results")
      expect(key_results.size).to eq(1)
      expect(key_results.first).to include(
        "id" => a_kind_of(Integer),
        "name" => "正式版をリリースする",
        "objective_id" => objective.id,
        "target_value" => 1.0,
        "actual_value" => 0.0,
        "value_unit" => "人",
        "expired_date" => 3.months.since.to_date.to_s,
        "progress_rate" => 0,
        "status" => "green",
        "description" => nil,
        "disabled" => false,
        "is_full" => true,
        "child_objective_ids" => [],
        "owner" =>
        { "id" => a_kind_of(Integer),
          "first_name" => "園田",
          "last_name" => "次郎",
          "avatar_url" => nil,
          "disabled" => false },
        "members" => []
      )
    end

    example "SUCCESS: When specifying Objective's Owner" do
      explanation <<~EOF
        user_idがサインインユーザと同じ組織のユーザであれば、そのユーザが着手していないKeyResults一覧を取得することができる。
        Objectiveのownerが作成したKeyResultは自動的にownerであるユーザが着手していることになる。
        そのため、ownerを指定する場合はKeyResultsを取得することが出来ない。
      EOF

      do_request(
        user_id: admin_user.id,
        okr_period_id: okr_period.id
      )

      expect(response_status).to eq(200)

      expect(parse_response_body).to include(
        "key_results" => []
      )
    end

    example "ERROR: When the user_id passed is an organization different from the sign-in user" do
      explanation "渡したuser_idがサインインユーザとは異なる組織である場合、403 forbiddenを返す"

      do_request(
        user_id: other_org_user.id,
        okr_period_id: okr_period.id
      )

      expect(response_status).to eq(403)
      expect(parse_response_body("error")).to eq("許可されていない操作です")
    end
  end
end

# frozen_string_literal: true

require "rspec_api_documentation/dsl"
Rails.root.join("spec/acceptance/concerns").each_child { |path| require_dependency(path) }

RSpec.resource "POST /key_results", warden: true do
  explanation "key_results#create"

  include OrganizationDataset
  include RequestHeaderJson

  before do
    # NOTE サインインユーザは admin か objective_id で指定した Objective の owner でなければならない
    login_as(admin_user)
  end

  post "/key_results" do
    with_options scope: :key_result do
      parameter :owner_id, "責任者とするユーザのID", type: :integer, required: true
      parameter :objective_id, "親となるObjectiveのID", type: :integer, required: true
      parameter :name, "KeyResultのタイトル", type: :string, required: true
      parameter :expired_date, "期限(YYYY-MM-DD)", type: :string, required: true
      parameter :description, "説明文", type: :string
      parameter :target_value, "目標値", type: :number
      parameter :value_unit, "目標値の単位", type: :string
      parameter :members, "関係者とするUser ID", type: :array
    end

    example "SUCCESS: create a new KeyResult" do
      explanation "新しいKeyResultを作成する"

      expired_date = 3.months.since.to_date.to_s

      do_request(
        key_result: {
          owner_id: admin_user.id,
          objective_id: objective.id,
          name: "月間アクセスを増やす",
          expired_date: expired_date,
          description: "使いやすくしてアクセス数を増やす",
          target_value: "10000",
          value_unit: "アクセス/月",
          members: [other_user.id, nomal_user.id]
        }
      )

      expect(response_status).to eq(201)
      expect(parse_response_body("key_result")).to include(
        "id" => a_kind_of(Integer),
        "name" => "月間アクセスを増やす",
        "objective_id" => objective.id,
        "target_value" => 10_000.0,
        "actual_value" => nil,
        "value_unit" => "アクセス/月",
        "expired_date" => expired_date,
        "progress_rate" => 0,
        "status" => "green",
        "description" => "使いやすくしてアクセス数を増やす",
        "disabled" => false,
        "is_full" => true,
        "child_objective_ids" => [],
        "owner" => {
          "id" => admin_user.id,
          "first_name" => "太郎",
          "last_name" => "山田",
          "avatar_url" => nil,
          "disabled" => false
        },
        "members" => [
          {
            "id" => other_user.id,
            "first_name" => "園田",
            "last_name" => "次郎",
            "avatar_url" => nil,
            "disabled" => false
          },
          {
            "id" => nomal_user.id,
            "first_name" => "普通",
            "last_name" => "たろう",
            "avatar_url" => nil,
            "disabled" => false
          }
        ],
        "result" => nil,
        "is_processed" => true,
        "achievement_rate" => nil,
        "objective" => {
          "id" => objective.id,
          "name" => "使いやすいサービスを作る",
          "description" => "事業を成功させるには、少なくとも競合より使いやすいサービスが欲しい。",
          "okr_period_id" => okr_period.id,
          "progress_rate" => 0,
          "result" => nil,
          "parent_key_result_id" => nil,
          "updated_at" => be_time_iso8601,
          "key_result_order" => nil,
          "disabled" => false,
          "is_full" => true,
          "key_result_ids" => all(a_kind_of(Integer)),
          "owner" => {
            "id" => admin_user.id,
            "first_name" => "太郎",
            "last_name" => "山田",
            "avatar_url" => nil,
            "disabled" => false
          },
          "sub_progress_rate" => 0,
          "connected_key_results" => []
        },
        "comments" => []
      )
    end

    example "SUCCESS: When input only required parameters" do
      explanation "必須項目のみ入力する場合"

      do_request(
        key_result: {
          owner_id: admin_user.id,
          objective_id: objective.id,
          name: "月間アクセスを増やす",
          expired_date: 3.months.since.to_date.to_s,
          description: "",
          target_value: "",
          value_unit: "",
          members: []
        }
      )

      expect(response_status).to eq(201)
      expect(parse_response_body("key_result", "name")).to eq("月間アクセスを増やす")
    end

    example "ERROR: invalid owner_id" do
      explanation "owner_id で指定したユーザがサインインユーザと異なる組織の場合、エラーとなる"

      do_request(
        key_result: {
          owner_id: other_org_user.id,
          objective_id: objective.id,
          name: "月間アクセスを増やす",
          expired_date: 3.months.since.to_date.to_s,
          description: "使いやすくしてアクセス数を増やす",
          target_value: "10000",
          value_unit: "アクセス/月",
          members: [other_user.id, nomal_user.id]
        }
      )

      expect(response_status).to eq(403)
      expect(parse_response_error).to eq(["許可されていない操作です"])
    end

    example "ERROR: invalid objective_id" do
      explanation "objective_idで指定したObjectiveがサインインユーザと異なる組織の場合、エラーとなる"

      do_request(
        key_result: {
          owner_id: admin_user.id,
          objective_id: other_org_objective.id,
          name: "月間アクセスを増やす",
          expired_date: 3.months.since.to_date.to_s,
          description: "使いやすくしてアクセス数を増やす",
          target_value: "10000",
          value_unit: "アクセス/月",
          members: [other_user.id, nomal_user.id]
        }
      )

      expect(response_status).to eq(403)
      expect(parse_response_error).to eq(["許可されていない操作です"])
    end

    example "ERROR: invalid members_id" do
      explanation "membersで指定したユーザーがサインインユーザと異なる組織の場合、エラーとなる"

      do_request(
        key_result: {
          owner_id: admin_user.id,
          objective_id: objective.id,
          name: "月間アクセスを増やす",
          expired_date: 3.months.since.to_date.to_s,
          description: "使いやすくしてアクセス数を増やす",
          target_value: "10000",
          value_unit: "アクセス/月",
          members: [other_org_user.id]
        }
      )

      expect(response_status).to eq(403)
      expect(parse_response_error).to eq(["許可されていない操作です"])
    end

    example "ERROR: When do not input required parameters" do
      explanation "owner_idとobjective_id以外の必須項目を入力していない場合、エラーとなる"

      do_request(
        key_result: {
          owner_id: admin_user.id,
          objective_id: objective.id,
          name: "",
          expired_date: "",
          description: "",
          target_value: "",
          value_unit: "",
          members: []
        }
      )

      expect(response_status).to eq(422)
      expect(parse_response_error).to contain_exactly(
        "期限の値が不正です",
        "Key Resultを入力してください"
      )
    end
  end
end

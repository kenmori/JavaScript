# frozen_string_literal: true
require "rspec_api_documentation/dsl"
require_relative '../concerns/organization_dataset'

RSpec.resource 'POST /key_results', warden: true do
  explanation 'key_results#create'

  include OrganizationDataset

  header 'Content-Type', 'application/json'
  header 'Accept', 'application/json'

  before do
    login_as(admin_user)
  end

  post '/key_results' do
    with_options scope: :key_result do
      parameter :owner_id, '作成者とするユーザのID', type: :integer, required: true
      parameter :objective_id, '親となるObjectiveのID', type: :integer, required: true
      parameter :name, 'KeyResultのタイトル', type: :string, required: true
      parameter :expired_date, '期限(YYYY-MM-DD)', type: :string, required: true
      parameter :description, '説明文', type: :string
      parameter :target_value, '目標値', type: :number
      parameter :value_unit, '目標値の単位', type: :string
      parameter :members, '関係者とするUser ID', type: :array
    end

    example 'SUCCESS: create a new KeyResult' do
      explanation '新しいKeyResultを作成する'

      expired_date = 3.month.since.to_date.to_s

      do_request(
        key_result: {
          owner_id: admin_user.id,
          objective_id: objective.id,
          name: '月間アクセスを増やす',
          expired_date: expired_date,
          description: '使いやすくしてアクセス数を増やす',
          target_value: '10000',
          value_unit: 'アクセス/月',
          members: [other_user.id, login_user.id],
        }
      )

      expect(status).to eq(201)
      expect(parse_response_body("key_result")).to include(
        "id" => a_kind_of(Integer),
        "name" => "月間アクセスを増やす",
        "objective_id" => objective.id,
        "target_value" => 10000.0,
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
            "id" => login_user.id,
            "first_name" => "ログイン",
            "last_name" => "したろう",
            "avatar_url" => nil,
            "disabled" => false
          }
        ],
        "result" => nil,
        "is_processed" => true,
        "achievement_rate" => nil,
        "objective"=>{
          "id" => objective.id,
          "name" => "使いやすいサービスを作る",
          "description" => "事業を成功させるには、少なくとも競合より使いやすいサービスが欲しい。",
          "okr_period_id" => okr_period.id,
          "progress_rate" => 0,
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

    example 'ERROR: owner_id が admin でも、 objective_id で指定した Objective の owner では無い時'
    example 'ERROR: owner_idとobjective_id以外の必須項目を入力していない時'
  end
end

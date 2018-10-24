# frozen_string_literal: true

require "rspec_api_documentation/dsl"
Rails.root.join("spec/acceptance/concerns").each_child { |path| require_dependency(path) }

RSpec.resource "PATCH /key_results/:id", warden: true do
  explanation "key_results#update フロントエンドのフォームを編集する度にそのパラメータのみ送信されてくる仕様"

  include OrganizationDataset
  include RequestHeaderJson

  before do
    login_as(admin_user)
  end

  patch "/key_results/:id" do
    parameter :id, "更新対象とするKeyResultのID", type: :integer, required: true
    let(:id) { key_result.id }

    describe "key_result name" do
      with_options scope: :key_result do
        parameter :id, "更新対象とするKeyResultのID", type: :integer
        parameter :name, "KeyResultのタイトル", type: :string
      end

      example "SUCCESS: Change key_result name" do
        explanation "指定したKeyResultのタイトルを変更する"

        do_request(
          key_result: {
            id: key_result.id,
            name: "変更後のKeyResultのタイトル"
          }
        )

        expect(response_status).to eq(200)
        expect(parse_response_body("key_result", "name")).to eq("変更後のKeyResultのタイトル")

        # NOTE response body の内容を厳密にチェックすると大変なのでKeyのみ見ています
        expect(parse_response_body("key_result").keys).to match_array(
          %w(
            id
            name
            objective_id
            target_value
            actual_value
            value_unit
            expired_date
            progress_rate
            status
            description
            disabled
            is_full
            child_objective_ids
            owner
            members
            result
            is_processed
            achievement_rate
            objective
            comments
          )
        )
        expect(parse_response_body("key_result", "owner").keys).to match_array(
          %w(
            id
            first_name
            last_name
            avatar_url
            disabled
          )
        )
        expect(parse_response_body("key_result", "objective").keys).to match_array(
          %w(
            id
            name
            description
            okr_period_id
            progress_rate
            parent_key_result_id
            updated_at
            key_result_order
            disabled
            is_full
            key_result_ids
            owner
            sub_progress_rate
            connected_key_results
          )
        )
        expect(parse_response_body("key_result", "objective", "owner").keys).to match_array(
          %w(
            id
            first_name
            last_name
            avatar_url
            disabled
          )
        )
      end
    end

    describe 'key_result expired_date' do
      with_options scope: :key_result do
        parameter :id, "更新対象とするKeyResultのID", type: :integer
        parameter :expired_date, "期限(YYYY-MM-DD)", type: :string
      end

      example 'SUCCESS: Change key_result expired_date' do
        explanation "指定したKeyResultの期限を変更する"

        expired_date = 4.months.since.to_date.to_s

        do_request(
          key_result: {
            id: key_result.id,
            expired_date: expired_date
          }
        )

        expect(response_status).to eq(200)
        expect(parse_response_body("key_result", "expired_date")).to eq(expired_date)
      end
    end

    describe 'key_result description' do
      with_options scope: :key_result do
        parameter :id, "更新対象とするKeyResultのID", type: :integer
        parameter :description, "説明文", type: :string
      end

      example 'SUCCESS: Change key_result description' do
        explanation "指定したKeyResultの説明文を変更する"

        do_request(
          key_result: {
            id: key_result.id,
            description: "更新後の説明文"
          }
        )

        expect(response_status).to eq(200)
        expect(parse_response_body("key_result", "description")).to eq("更新後の説明文")
      end
    end

    describe 'key_result target_value' do
      with_options scope: :key_result do
        parameter :id, "更新対象とするKeyResultのID", type: :integer
        parameter :target_value, "目標値", type: :number
      end

      example 'SUCCESS: Change key_result target_value' do
        explanation "指定したKeyResultの目標値を変更する"

        do_request(
          key_result: {
            id: key_result.id,
            target_value: 100
          }
        )

        expect(response_status).to eq(200)
        expect(parse_response_body("key_result", "target_value")).to eq(100)
      end
    end

    describe 'key_result value_unit' do
      with_options scope: :key_result do
        parameter :id, "更新対象とするKeyResultのID", type: :integer
        parameter :value_unit, "目標値の単位", type: :string
      end

      example 'SUCCESS: Change key_result value_unit' do
        explanation "指定したKeyResultの目標値の単位を変更する"

        do_request(
          key_result: {
            id: key_result.id,
            value_unit: "回"
          }
        )

        expect(response_status).to eq(200)
        expect(parse_response_body("key_result", "value_unit")).to eq("回")
      end
    end

    describe 'key_result progress_rate' do
      with_options scope: :key_result do
        parameter :id, "更新対象とするKeyResultのID", type: :integer
        parameter :progress_rate, "進捗", type: :integer
      end

      example 'SUCCESS: Change key_result progress_rate' do
        explanation "指定したKeyResultの進捗を変更する"

        do_request(
          key_result: {
            id: key_result.id,
            progress_rate: 25
          }
        )

        expect(response_status).to eq(200)
        expect(parse_response_body("key_result", "progress_rate")).to eq(25)
      end
    end

    describe 'key_result actual_value' do
      with_options scope: :key_result do
        parameter :id, "更新対象とするKeyResultのID", type: :integer
        parameter :actual_value, "実績値", type: :number
      end

      example 'SUCCESS: Change key_result actual_value' do
        explanation "指定したKeyResultの実績値を変更する"

        do_request(
          key_result: {
            id: key_result.id,
            actual_value: 20
          }
        )

        expect(response_status).to eq(200)
        expect(parse_response_body("key_result", "actual_value")).to eq(20)
      end
    end

    describe 'key_result status' do
      with_options scope: :key_result do
        parameter :id, "更新対象とするKeyResultのID", type: :integer
        parameter :status, "見通し", type: :string, enum: %w(green yellow red)
      end

      example 'SUCCESS: Change key_result status' do
        explanation "指定したKeyResultの見通しを変更する"

        do_request(
          key_result: {
            id: key_result.id,
            status: "yellow"
          }
        )

        expect(response_status).to eq(200)
        expect(parse_response_body("key_result", "status")).to eq("yellow")
      end
    end

      # parameter :objective_id, "紐付くObjective ID", type: :integer
      # parameter :result, "結果(KeyResultの最終的な進捗を補足する情報をユーザが入力する)", type: :string

      # # TODO type: :object で書いたほうがいいかも
      # with_options scope: :member do
      #   parameter :user, "関係者または責任者とするUser ID", type: :integer
      #   parameter :behavior, "命令種別", enum: %w(add remove)
      #   parameter :role, "関係者(member)か責任者(owner)を指定する", enum: %w(member owner)
      # end
      # # {"user"=>3, "behavior"=>"add", "role"=>"member"}
      # # {"user"=>3, "behavior"=>"remove", "role"}

      # with_options scope: :comment do
      #   parameter :data, "behaviorの値によって全然違う"
      #   parameter :behavior, "命令種別", enum: %w(add edit remove)
      #   parameter :key_result_comment_label, "コメントラベルID(behaviorがaddの場合のみ {\"id\": 1} のような値がある。editの場合も指定できるがフォーマットが異なる)", type: :object
      # end
      # # {"data"=>"吐き気をもよおす邪悪 とは", "key_result_comment_label"=>{"id"=>1}, "behavior"=>"add"}
      # # {"data"=>{"id"=>3, "text"=>"にゃーん", "key_result_comment_label"=>{"id"=>1}},  "behavior"=>"edit"}
      # # {"data"=>2, "behavior"=>"remove"}
    # end

    example "ERROR: "
  end
end

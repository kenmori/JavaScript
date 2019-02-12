# frozen_string_literal: true

require "rspec_api_documentation/dsl"
Rails.root.join("spec/acceptance/concerns").each_child { |path| require_dependency(path) }

RSpec.resource "key_results", warden: true do
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
            id: id,
            name: "変更後のKeyResultのタイトル"
          }
        )

        expect(response_status).to eq(200)
        expect(parse_response_body("key_result", "name")).to eq("変更後のKeyResultのタイトル")

        # NOTE response body の内容を厳密にチェックすると大変なのでKeyのみ見ています
        expect(parse_response_body("key_result").keys).to match_array(
          %w[
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
            updated_at
            child_objective_ids
            owner
            members
            result
            is_processed
            achievement_rate
            objective
            comments
          ]
        )
        expect(parse_response_body("key_result", "owner").keys).to match_array(
          %w[
            id
            first_name
            last_name
            avatar_url
            disabled
          ]
        )
        expect(parse_response_body("key_result", "objective").keys).to match_array(
          %w[
            id
            name
            description
            okr_period_id
            progress_rate
            result
            parent_key_result_id
            updated_at
            key_result_order
            disabled
            is_full
            key_result_ids
            owner
            sub_progress_rate
            connected_key_results
          ]
        )
        expect(parse_response_body("key_result", "objective", "owner").keys).to match_array(
          %w[
            id
            first_name
            last_name
            avatar_url
            disabled
          ]
        )
      end
    end

    describe "key_result expired_date" do
      with_options scope: :key_result do
        parameter :id, "更新対象とするKeyResultのID", type: :integer, required: true
        parameter :expired_date, "期限(YYYY-MM-DD)", type: :string
      end

      example "SUCCESS: Change key_result expired_date" do
        explanation "指定したKeyResultの期限を変更する"

        expired_date = 4.months.since.to_date.to_s

        do_request(
          key_result: {
            id: id,
            expired_date: expired_date
          }
        )

        expect(response_status).to eq(200)
        expect(parse_response_body("key_result", "expired_date")).to eq(expired_date)
      end
    end

    describe "key_result description" do
      with_options scope: :key_result do
        parameter :id, "更新対象とするKeyResultのID", type: :integer, required: true
        parameter :description, "説明文", type: :string
      end

      example "SUCCESS: Change key_result description" do
        explanation "指定したKeyResultの説明文を変更する"

        do_request(
          key_result: {
            id: id,
            description: "更新後の説明文"
          }
        )

        expect(response_status).to eq(200)
        expect(parse_response_body("key_result", "description")).to eq("更新後の説明文")
      end
    end

    describe "key_result target_value" do
      with_options scope: :key_result do
        parameter :id, "更新対象とするKeyResultのID", type: :integer, required: true
        parameter :target_value, "目標値", type: :number
      end

      example "SUCCESS: Change key_result target_value" do
        explanation "指定したKeyResultの目標値を変更する"

        do_request(
          key_result: {
            id: id,
            target_value: 100
          }
        )

        expect(response_status).to eq(200)
        expect(parse_response_body("key_result", "target_value")).to eq(100)
      end
    end

    describe "key_result value_unit" do
      with_options scope: :key_result do
        parameter :id, "更新対象とするKeyResultのID", type: :integer, required: true
        parameter :value_unit, "目標値の単位", type: :string
      end

      example "SUCCESS: Change key_result value_unit" do
        explanation "指定したKeyResultの目標値の単位を変更する"

        do_request(
          key_result: {
            id: id,
            value_unit: "回"
          }
        )

        expect(response_status).to eq(200)
        expect(parse_response_body("key_result", "value_unit")).to eq("回")
      end
    end

    describe "key_result progress_rate" do
      with_options scope: :key_result do
        parameter :id, "更新対象とするKeyResultのID", type: :integer, required: true
        parameter :progress_rate, "進捗", type: :integer
      end

      example "SUCCESS: Change key_result progress_rate" do
        explanation "指定したKeyResultの進捗を変更する"

        do_request(
          key_result: {
            id: id,
            progress_rate: 25
          }
        )

        expect(response_status).to eq(200)
        expect(parse_response_body("key_result", "progress_rate")).to eq(25)
      end
    end

    describe "key_result actual_value" do
      with_options scope: :key_result do
        parameter :id, "更新対象とするKeyResultのID", type: :integer, required: true
        parameter :actual_value, "実績値", type: :number
      end

      example "SUCCESS: Change key_result actual_value" do
        explanation "指定したKeyResultの実績値を変更する"

        do_request(
          key_result: {
            id: id,
            actual_value: 20
          }
        )

        expect(response_status).to eq(200)
        expect(parse_response_body("key_result", "actual_value")).to eq(20)
      end
    end

    describe "key_result status" do
      with_options scope: :key_result do
        parameter :id, "更新対象とするKeyResultのID", type: :integer, required: true
        parameter :status, "見通し", type: :string, enum: %w[green yellow red]
      end

      example "SUCCESS: Change key_result status" do
        explanation "指定したKeyResultの見通しを変更する"

        do_request(
          key_result: {
            id: id,
            status: "yellow"
          }
        )

        expect(response_status).to eq(200)
        expect(parse_response_body("key_result", "status")).to eq("yellow")
      end
    end

    describe "key_result result" do
      with_options scope: :key_result do
        parameter :id, "更新対象とするKeyResultのID", type: :integer, required: true
        parameter :result, "結果(KeyResultの最終的な進捗を補足する情報をユーザが入力する)", type: :string
      end

      example "SUCCESS: Change key_result result" do
        explanation "指定したKeyResultの結果を変更する"

        do_request(
          key_result: {
            id: id,
            result: "更新後の結果"
          }
        )

        expect(response_status).to eq(200)
        expect(parse_response_body("key_result", "result")).to eq("更新後の結果")
      end
    end

    describe "key_result objective_id" do
      let!(:other_objective) do
        ObjectiveFactory.new(user: admin_user, okr_period: okr_period).create(
          name: "業界一のシェアを得る"
        )
      end

      with_options scope: :key_result do
        parameter :id, "更新対象とするKeyResultのID", type: :integer, required: true
        parameter :objective_id, "紐付くObjective ID", type: :integer
      end

      example "SUCCESS: Change key_result objective_id" do
        explanation "指定したKeyResultに紐付くObjectiveを変更する"

        do_request(
          key_result: {
            id: id,
            objective_id: other_objective.id
          }
        )

        expect(response_status).to eq(200)
        expect(parse_response_body("key_result", "objective_id")).to eq(other_objective.id)
      end

      example "ERROR: When objective id is different organization" do
        explanation "異なるOKR期間のObjective IDを指定した場合エラー"

        do_request(
          key_result: {
            id: id,
            objective_id: other_org_objective.id
          }
        )

        expect(response_status).to eq(422)
        expect(parse_response_body.keys).to contain_exactly("errors")
      end
    end

    describe "key_result member" do
      with_options scope: :key_result do
        parameter :id, "更新対象とするKeyResultのID", type: :integer, required: true

        with_options scope: %i[key_result member] do
          parameter :user, "関係者または責任者とするUser ID", type: :integer, required: true
          parameter :behavior, "命令種別", enum: %w[add remove], required: true
          parameter :role, "関係者(member)か責任者(owner)を指定する", enum: %w[member owner], required: true
        end
      end

      example "SUCCESS: Add key_result member" do
        explanation "指定したKeyResultに関係者を追加する"

        do_request(
          key_result: {
            id: id,
            member: {
              user: other_user.id,
              behavior: "add",
              role: "member"
            }
          }
        )

        expect(response_status).to eq(200)
        expect(parse_response_body("key_result", "members", 0, "id")).to eq(other_user.id)
        expect(parse_response_body("key_result", "members")).to eq(
          [
            {
              "id" => other_user.id,
              "first_name" => "園田",
              "last_name" => "次郎",
              "avatar_url" => nil,
              "disabled" => false
            }
          ]
        )
      end

      example "SUCCESS: Remove key_result member" do
        explanation "指定したKeyResultから関係者を削除する"

        KeyResultMember.create!(
          key_result: key_result,
          user: other_user,
          role: :member
        )

        do_request(
          key_result: {
            id: id,
            member: {
              user: other_user.id,
              behavior: "remove",
              role: nil
            }
          }
        )

        expect(response_status).to eq(200)
        expect(parse_response_body("key_result", "members")).to be_empty
      end

      example "SUCCESS: Add key_result owner" do
        explanation "指定したKeyResultの責任者を変更する"

        do_request(
          key_result: {
            id: id,
            member: {
              user: other_user.id,
              behavior: "add",
              role: "owner"
            }
          }
        )

        expect(response_status).to eq(200)
        expect(parse_response_body("key_result", "owner")).to include(
          "id" => other_user.id,
          "first_name" => "園田",
          "last_name" => "次郎",
          "avatar_url" => nil,
          "disabled" => false
        )
      end

      example "ERROR: When owner id is different organization" do
        explanation "異なる組織のユーザーを責任者とする場合エラー"

        do_request(
          key_result: {
            id: id,
            member: {
              user: other_org_user.id,
              behavior: "add",
              role: "member"
            }
          }
        )

        expect(response_status).to eq(422)
        expect(parse_response_body.keys).to contain_exactly("errors")
      end

      example "ERROR: When member id is different organization" do
        explanation "異なる組織のユーザーを関係者とする場合エラー"

        do_request(
          key_result: {
            id: id,
            member: {
              user: other_org_user.id,
              behavior: "add",
              role: "owner"
            }
          }
        )

        expect(response_status).to eq(422)
        expect(parse_response_body.keys).to contain_exactly("errors")
      end
    end

    describe "key_result comment" do
      describe "add" do
        with_options scope: :key_result do
          parameter :id, "更新対象とするKeyResultのID", type: :integer, required: true

          with_options scope: %i[key_result comment] do
            parameter :behavior, "命令種別(今回はaddの例)", enum: %w[add edit remove], required: true
            parameter :data, "コメント本文", type: :string, required: true

            with_options scope: %i[key_result comment key_result_comment_label] do
              parameter :id, "コメントにつけるKeyResultCommentLabelのID", type: :integer
            end
          end
        end

        let!(:key_result_comment_label) { KeyResultCommentLabelFactory.new(organization: organization).create }

        example "SUCCESS: Add comment" do
          explanation "新しいコメントを追加する"

          do_request(
            key_result: {
              id: id,
              comment: {
                behavior: "add",
                data: "新しいコメント",
                key_result_comment_label: {
                  id: key_result_comment_label.id
                }
              }
            }
          )

          expect(response_status).to eq(200)
          expect(parse_response_body("key_result", "comments", 0)).to include(
            "id" => a_kind_of(Integer),
            "text" => "新しいコメント",
            "show_meeting_board" => true,
            "updated_at" => be_time_iso8601,
            "editable" => true,
            "is_edited" => false,
            "label" => {
              "id" => key_result_comment_label.id,
              "name" => "今週の優先事項",
              "color" => "blue"
            },
            "user" => {
              "id" => admin_user.id,
              "first_name" => "太郎",
              "last_name" => "山田",
              "avatar_url" => nil,
              "disabled" => false
            }
          )
        end
      end

      describe "edit" do
        with_options scope: :key_result do
          parameter :id, "更新対象とするKeyResultのID", type: :integer, required: true

          with_options scope: %i[key_result comment] do
            parameter :behavior, "命令種別(今回はeditの例)", enum: %w[add edit remove]

            with_options scope: %i[key_result comment data], required: true do
              parameter :id, "編集対象とするコメントのID", type: :integer, required: true
              parameter :text, "編集後のコメント本文", type: :string, required: true

              with_options scope: %i[key_result comment data key_result_comment_label] do
                parameter :id, "コメントにつけるKeyResultCommentLabelのID", type: :integer
              end
            end
          end
        end

        let!(:comment) { CommentFactory.new(key_result: key_result, user: admin_user).create }

        example "SUCCESS: Edit comment" do
          explanation "既存のコメントを編集する"

          do_request(
            key_result: {
              id: id,
              comment: {
                behavior: "edit",
                data: {
                  id: comment.id,
                  text: "編集後のコメント",
                  key_result_comment_label: {
                    id: nil
                  }
                }
              }
            }
          )

          expect(response_status).to eq(200)
          expect(parse_response_body("key_result", "comments", 0)).to include(
            "id" => comment.id,
            "text" => "編集後のコメント",
            "show_meeting_board" => true,
            "updated_at" => be_time_iso8601,
            "editable" => true,
            "user" => {
              "id" => admin_user.id,
              "first_name" => "太郎",
              "last_name" => "山田",
              "avatar_url" => nil,
              "disabled" => false
            }
          )
        end

        example "ERROR: When comment id at editing is different organization" do
          explanation "コメント編集時に指定したコメントIDが別の組織である場合エラー"

          other_org_comment = CommentFactory.new(key_result: other_org_key_result, user: other_org_user).create

          do_request(
            key_result: {
              id: id,
              comment: {
                behavior: "edit",
                data: {
                  id: other_org_comment.id,
                  text: "編集後のコメント",
                  key_result_comment_label: {
                    id: nil
                  }
                }
              }
            }
          )

          expect(response_status).to eq(422)
          expect(parse_response_body.keys).to contain_exactly("errors")
        end
      end

      describe "remove" do
        with_options scope: :key_result do
          parameter :id, "更新対象とするKeyResultのID", type: :integer, required: true

          with_options scope: %i[key_result comment] do
            parameter :behavior, "命令種別(今回はremoveの例)", enum: %w[add edit remove], required: true
            parameter :data, "削除するコメントのID", type: :integer, required: true
          end
        end

        let!(:comment) { CommentFactory.new(key_result: key_result, user: admin_user).create }

        example "SUCCESS: Remove comment" do
          explanation "既存のコメントを削除する"

          do_request(
            key_result: {
              id: id,
              comment: {
                behavior: "remove",
                data: comment.id
              }
            }
          )

          expect(response_status).to eq(200)
          expect(parse_response_body("key_result", "comments")).to be_empty
        end
      end

      example "ERROR: When comment id at removing is different organization" do
        explanation "コメント削除時に指定したコメントIDが別の組織である場合エラー"

        other_org_comment = CommentFactory.new(key_result: other_org_key_result, user: other_org_user).create

        do_request(
          key_result: {
            id: id,
            comment: {
              behavior: "remove",
              data: other_org_comment.id
            }
          }
        )

        expect(response_status).to eq(422)
        expect(parse_response_body.keys).to contain_exactly("errors")
      end
    end

    context "When the key result belongs to another organization" do
      let!(:id) { other_org_key_result.id }

      example "ERROR: invalid organization of a key result" do
        explanation "指定したKeyResultのOrganizationがサインインユーザのOrganizationと異なる場合エラーとなる"

        do_request(
          key_result: {
            id: id,
            name: "変更後のKeyResultのタイトル"
          }
        )

        expect(response_status).to eq(403)
        expect(parse_response_error).to eq(["許可されていない操作です"])
      end
    end
  end
end

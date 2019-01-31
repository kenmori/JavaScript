# frozen_string_literal: true

class KeyResultVersionSerializer < ActiveModel::Serializer
  attributes :created_at, :diffs, :type
  belongs_to :user

  def diffs
    case object.class.to_s
    when "KeyResultVersion"
      history_diffs(object)
    when "Comment"
      comment_diffs(object)
    end
  end

  def type
    object.class.to_s.underscore
  end

  private

    def history_diffs(history)
      snapshot = history.reify(dup: true)
      JSON.parse(history.object_changes).each_with_object([]) do |(k, v), memo|
        diff = {}
        case k
        when "disabled_at"
          # 無効にしたのであれば変更日時ではなく差分メッセージを送る
          diff = {
            column: I18n.t("activerecord.attributes.key_result.#{k}"),
            before: v[0].nil? ? "有効" : "無効",
            after: v[1].nil? ? "有効" : "無効"
          }
        when "status"
          diff = {
            column: I18n.t("activerecord.attributes.key_result.#{k}"),
            before: I18n.t("enums.key_result.status.#{KeyResult.statuses.key(v[0])}"),
            after: I18n.t("enums.key_result.status.#{KeyResult.statuses.key(v[1])}")
          }
        when "progress_rate"
          # progress_rateがnilでない場合、子の進捗率を無視して直接進捗率編集したことになる
          # その場合はprogress_rateの値を利用するが、nilであればsub_progress_rateの値を参照する
          before = v[0]
          after = v[1]
          if before.nil?
            before = snapshot.sub_progress_rate.nil? ? "0" : snapshot.sub_progress_rate
          end
          if after.nil?
            after = snapshot.sub_progress_rate.nil? ? "0" : snapshot.sub_progress_rate
          end

          diff = {
            column: I18n.t("activerecord.attributes.key_result.#{k}"),
            before: "#{before}%",
            after: "#{after}%"
          }
        when "sub_progress_rate"
          diff = {
            column: I18n.t("activerecord.attributes.key_result.#{k}"),
            before: v[0].nil? ? "0%" : "#{v[0]}%",
            after: v[1].nil? ? "0%" : "#{v[1]}%"
          }
        else
          diff = {
            column: I18n.t("activerecord.attributes.key_result.#{k}"),
            before: v[0].nil? ? "初期値" : v[0],
            after: v[1].nil? ? "初期値" : v[1]
          }
        end
        memo << diff
      end
    end

    def comment_diffs(comment)
      label = comment.key_result_comment_label
      [create_diff(
        column: label.present? ? label.name : comment.model_name.human,
        before: "",
        after: comment.text
      )]
    end

    def create_diff(column:, before:, after:)
      {
        column: column,
        before: before,
        after: after
      }
    end
end

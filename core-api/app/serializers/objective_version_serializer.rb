class ObjectiveVersionSerializer < ActiveModel::Serializer
  attributes :created_at, :diffs, :type
  belongs_to :user

  def diffs
    case object.class.to_s
    when "ObjectiveVersion"
      return history_diffs(object)
    when "ObjectiveComment"
      return comment_diffs(object)
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
          diff = create_diff(
            column: I18n.t("activerecord.attributes.objective.#{k}"),
            before: v[0].nil? ? "有効" : "無効",
            after: v[1].nil? ? "有効" : "無効"
          )
        when "progress_rate"
          # progress_rateがnilでない場合、子の進捗率を無視して直接進捗率編集したことになる
          # その場合はprogress_rateの値を利用するが、nilであればsub_progress_rateの値を参照する
          diff = create_diff(
            column: I18n.t("activerecord.attributes.objective.#{k}"),
            before: v[0].nil? ? "#{snapshot.sub_progress_rate}%" : "#{v[0]}%",
            after: v[1].nil? ? "#{snapshot.sub_progress_rate}%" : "#{v[1]}%"
          )
        when "sub_progress_rate"
          diff = create_diff(
            column: I18n.t("activerecord.attributes.objective.#{k}"),
            before: v[0].nil? ? "0%" : "#{v[0]}%",
            after: v[1].nil? ? "0%" : "#{v[1]}%"
          )
        else
          diff = create_diff(
            column: I18n.t("activerecord.attributes.objective.#{k}"),
            before: v[0].nil? ? "初期値" : v[0],
            after: v[1].nil? ? "初期値" : v[1]
          )
        end
        memo << diff
      end
    end

    def comment_diffs(comment)
      create_diff(
        column: comment.model_name.human,
        before: "",
        after: comment.text,
      )
    end

    def create_diff(column:, before:, after:)
      {
        column: column,
        before: before,
        after: after
      }
    end
end

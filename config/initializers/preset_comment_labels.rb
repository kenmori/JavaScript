# frozen_string_literal: true

module PresetCommentLabels
  module KeyResult
    DEFAULT_LABELS = [
      {
        name: "今週の優先事項",
        color: "blue"
      },
      {
        name: "今後4週間(プロジェクト)",
        color: "teal"
      },
      {
        name: "ウィンセッション",
        color: "pink"
      },
      {
        name: "課題・障害",
        color: "red"
      }
    ].map(&:freeze).freeze
  end
end

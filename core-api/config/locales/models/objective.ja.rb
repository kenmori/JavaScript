# frozen_string_literal: true

require_dependency Rails.root.join("config/locales/share/model_names")

{
  ja: {
    activerecord: {
      attributes: {
        objective: {
          id: "#{model_names[:objective]}ID",
          description: "説明",
          disabled_at: "ステータス",
          name: model_names[:objective],
          progress_rate: "進捗率",
          result: "結果",
          sub_progress_rate: "上位#{model_names[:key_result]}進捗率",
        }
      }
    }
  }
}

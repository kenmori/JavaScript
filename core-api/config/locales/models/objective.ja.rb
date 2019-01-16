# frozen_string_literal: true

require_dependency Rails.root.join("config/locales/share/model_names")

{
  ja: {
    activerecord: {
      attributes: {
        objective: {
          id: "ID",
          description: "説明",
          disabled_at: "無効日時",
          key_result_order: "#{model_names[:user]}ID",
          name: "#{model_names[:department]}名",
          progress_rate: "進捗率",
          result: "結果",
          sub_progress_rate: "上位Key Result進捗率",
          created_at: "作成日時",
          updated_at: "更新日時",
        }
      }
    }
  }
}

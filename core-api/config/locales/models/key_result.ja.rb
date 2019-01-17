# frozen_string_literal: true

require_dependency Rails.root.join("config/locales/share/model_names")

{
  ja: {
    activerecord: {
      attributes: {
        key_result: {
          id: "#{model_names[:key_result]}ID",
          actual_value: "実績値",
          description: "説明",
          disabled_at: "ステータス",
          expired_date: "期限",
          name: model_names[:key_result],
          progress_rate: "進捗率",
          result: "結果",
          status: "見通し",
          sub_progress_rate: "下位OKR進捗率",
          target_value: "目標値",
          value_unit: "目標値単位",
          objective_id: model_names[:objective],
          okr_period_id: model_names[:okr_period],
        },
      },
    },
    enums: {
      key_result: {
        status: {
          green: "順調",
          yellow: "注意",
          red: "危険",
        },
      },
    },
  }
}

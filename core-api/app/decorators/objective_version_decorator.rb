# frozen_string_literal: true

module ObjectiveVersionDecorator
  def diffs
    JSON.parse(object_changes).each_with_object([]) do |(k, v), memo|
      diff = {}
      # 無効にしたのであれば変更日時ではなく差分メッセージを送る
      if k == "disabled_at"
        diff = {
          column: I18n.t("activerecord.attributes.objective.#{k}"),
          before: v[0] == nil ? '有効' : '無効',
          after: v[1] == nil ? '有効' : '無効',
        }
      else
        diff = {
          column: I18n.t("activerecord.attributes.objective.#{k}"),
          before: v[0] == nil ? '初期値' : v[0],
          after: v[1] == nil ? '初期値' : v[1],
        }
      end
      memo << diff
    end
  end
end

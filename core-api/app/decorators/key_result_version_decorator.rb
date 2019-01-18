# frozen_string_literal: true

module KeyResultVersionDecorator
  def diffs
    JSON.parse(object_changes).each_with_object([]) do |(k, v), memo|
      diff = {}
      case k
      when "disabled_at"
        # 無効にしたのであれば変更日時ではなく差分メッセージを送る
        diff = {
          column: I18n.t("activerecord.attributes.key_result.#{k}"),
          before: v[0] == nil ? '有効' : '無効',
          after: v[1] == nil ? '有効' : '無効',
        }
      when "status"
        diff = {
          column: I18n.t("activerecord.attributes.key_result.#{k}"),
          before: I18n.t("enums.key_result.status.#{KeyResult.statuses.key(v[0])}"),
          after: I18n.t("enums.key_result.status.#{KeyResult.statuses.key(v[1])}"),
        }
      else
        diff = {
          column: I18n.t("activerecord.attributes.key_result.#{k}"),
          before: v[0] == nil ? '初期値' : v[0],
          after: v[1] == nil ? '初期値' : v[1],
        }
      end
      memo << diff
    end
  end
end

# frozen_string_literal: true

# Validation Error が発生したときなどにエラーの理由をJSONで render するメソッドをまとめています。
#
# 例外発生時のレスポンスは gaffe gem により errors_controller で行なっているので、
# エラー時のメッセージを特別なものにする必要がない場合には、単に例外を出す方が楽に実装することが出来ます。
#
# 例外時にデフォルトでどのようなレスポンスをするかは下記URLを参照してください。
# https://railsguides.jp/configuring.html#action-dispatchを設定する
#
# 例外時のレスポンスの変更、あるいは新規に例外を定義した場合には下記URLに従って例外時のレスポンスを設定してください。
# 未設定の場合 500 Internal Server Error になります。
# https://github.com/mirego/gaffe#custom-exceptions
#

module ErrorJsonResponder
  extend ActiveSupport::Concern

  private

    # render 403
    def forbidden(message = "許可されていない操作です")
      render_with_error(:forbidden, message)
    end

    # render 422
    def unprocessable_entity(message = "正常に処理できません")
      render_with_error(:unprocessable_entity, message)
    end

    # render 422 with errors
    def unprocessable_entity_with_errors(errors)
      render_with_error(:unprocessable_entity, errors)
    end

    # render_with_error is render json of error.
    def render_with_error(code, message)
      # TODO: structureの定義を見直す
      render json: { error: message }, status: code
    end
end

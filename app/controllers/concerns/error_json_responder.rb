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

    # TODO: DEPRECATION WARNING 仕様が古いので render_error_json を使うこと
    # render_with_error is render json of error.
    def render_with_error(code, message)
      render json: { error: message }, status: code
    end

    def render_error_json(status_code, messages)
      msgs =
        case messages
        when Array
          messages
        when String
          [messages]
        else
          raise ArgumentError, "\"messages\" must be Array or String"
        end
      error_format = { errors: msgs.map { |msg| { message: msg } } }

      render json: error_format, status: status_code
    end

    # conceptを実行して成功すれば block を実行し、失敗すればエラーをrenderする
    def runner(concept, params)
      result = concept.call(params: params, current_user: current_user)

      if result.success?
        yield result if block_given?
        return true
      end

      if result["result.policy.default"]&.failure?
        render_error_json(:forbidden, I18n.t("http_status.forbidden"))
      elsif result["result.contract.default"]&.failure?
        render_error_json(:bad_request, result["contract.default"].errors.full_messages)
      else
        render_error_json(:bad_request, I18n.t("http_status.code_400"))
      end
      false
    end
end

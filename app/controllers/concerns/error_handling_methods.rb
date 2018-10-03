# DEPRECATION WARNING エラーハンドリングは errors_controller で行う仕組みを導入したので、この module のメソッドは非推奨です。
# エラーハンドリングをしたい場合は次のようにしてください。
#
# TODO 使い方を書く
#
module ErrorHandlingMethods
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
    render_with_errors(:unprocessable_entity, errors)
  end

  # render_with_error is render json of error.
  def render_with_error(code, message)
    # TODO: structureの定義を見直す
    render json: { error: message }, status: code
  end

  # render_with_errors is render json of ActiveModel::Errors.
  def render_with_errors(code, errors)
    # TODO: クライアントとどうエラーのやり取りを行うか考える
    # errors.messageを展開するだけであれば展開した文字列を引数として
    # 直接renderせずにrender_with_errorを呼び出す方式に変える
    render json: { error: errors }, status: code
  end
end

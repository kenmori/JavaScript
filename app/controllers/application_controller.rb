class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  rescue_from ActiveRecord::RecordNotFound, with: :error_not_found

  def error_not_found
    # TODO:
    # 例外処理あとで設計する。
    render json: { error: '404 error' }, status: 404
  end
end

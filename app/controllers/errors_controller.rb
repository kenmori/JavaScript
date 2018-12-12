# frozen_string_literal: true

# この Controller は gaffe gem の力で動いています。
# 詳細は下記URLを参照してください。
# https://github.com/mirego/gaffe
#
class ErrorsController < ActionController::Base
  include Gaffe::Errors
  include ErrorJsonResponder

  protect_from_forgery except: :show
  layout false

  def show
    if request.format.html?
      html_error_handling
    else
      json_error_handling
    end
  end

  private

    def json_error_handling
      message = I18n.t("http_status.code_#{@status_code.to_s}", default: I18n.t('http_status.default'))

      render_error_json(@status_code, message)
    end

    def html_error_handling
      case @status_code.to_i
      when 404, 422, 500
        render "errors/#{@status_code}"
      else
        render "errors/404"
      end
    end
end

class DeviseCustomFailureApp < Devise::FailureApp
  def respond
    if request.format == :json
      json_error_response
    else
      super
    end
  end

  def json_error_response
    self.status = 401
    self.content_type = "application/json"
    self.response_body = {
      errors: [{
        message: i18n_message,
      }]
    }.to_json
  end
end

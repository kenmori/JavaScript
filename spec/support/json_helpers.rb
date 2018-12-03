# frozen_string_literal: true

module JsonHelpers
  def parse_response_body(*path)
    body = response_body
    return body if body.blank?

    json = JSON.parse(body)

    if path.present?
      json.dig(*path)
    else
      json
    end
  end

  def parse_response_error
    parse_response_body("errors").map { |h| h["message"] }
  end
end

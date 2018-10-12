module JsonHelpers
  def response_body_json(*path)
    json = JSON.parse(response_body)

    if path.present?
      json.dig(*path)
    else
      json
    end
  end
end

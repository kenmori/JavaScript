module JsonHelpers
  def parse_response_body(*path)
    json = JSON.parse(response_body)

    if path.present?
      json.dig(*path)
    else
      json
    end
  end
end

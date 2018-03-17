json.key_result do
  json.partial!(@key_result)

  json.objective do
    json.partial!(@key_result.objective)
  end
end

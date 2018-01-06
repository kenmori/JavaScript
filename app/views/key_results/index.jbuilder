json.key_results do
  json.array!(@key_results) do |key_result|
    json.partial!(key_result)
  end
end

json.key_result do
  json.partial!(@key_result)

  json.linked_objectives do
    json.array!(@key_result.linked_objectives) do |objective|
      json.extract! objective, :id, :progress_rate

      json.key_results do
        json.array!(objective.key_results) do |key_result|
          json.extract! key_result, :id, :progress_rate
        end
      end
    end
  end
end

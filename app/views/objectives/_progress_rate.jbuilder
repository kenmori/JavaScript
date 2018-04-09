json.partial!(objective)

json.connected_key_results do
  json.array!(objective.connected_key_results) do |key_result|
    json.extract! key_result, :id, :progress_rate
    json.child_progress_rate key_result.child_progress_rate

    json.objective do
      json.extract! key_result.objective, :id, :progress_rate
    end
  end
end

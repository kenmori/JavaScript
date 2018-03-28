json.key_result do
  json.partial!(@key_result)

  objective = @key_result.objective
  json.objective do
    json.partial!(objective)

    json.connected_key_results do
      json.array!(objective.connected_key_results) do |key_result|
        json.extract! key_result, :id, :progress_rate
        json.objective do
          json.extract! key_result.objective, :id, :progress_rate
        end
      end
    end
  end

  json.detached_objective do
    detached_objective = @key_result.detached_objective
    json.partial!(detached_objective) if detached_objective
  end
end

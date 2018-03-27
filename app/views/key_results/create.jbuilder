json.key_result do
  json.partial!(@key_result)

  json.objective do
    json.partial!(@key_result.objective)
  end

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

  json.detached_objective do
    detached_objective = @key_result.detached_objective
    json.partial!(detached_objective) if detached_objective
  end
end

json.objective do
  json.partial!(@objective)

  json.parent_objective do
    json.partial!(@objective.parent_objective) if @objective.parent_objective
  end

  parent_key_result = @objective.parent_key_result
  if parent_key_result
    json.parent_key_result do
      json.partial!(parent_key_result)

      json.connected_objectives do
        json.array!(parent_key_result.connected_objectives) do |objective|
          json.extract! objective, :id, :progress_rate
          json.parent_key_result do
            json.extract! objective.parent_key_result, :id, :progress_rate if objective.parent_key_result
          end
        end
      end
    end
  end

  detached_parent_key_result = @objective.detached_parent_key_result
  if detached_parent_key_result
    json.detached_parent_key_result do
      json.partial!(detached_parent_key_result)

      json.connected_objectives do
        json.array!(detached_parent_key_result.connected_objectives) do |objective|
          json.extract! objective, :id, :progress_rate
          json.parent_key_result do
            json.extract! objective.parent_key_result, :id, :progress_rate if objective.parent_key_result
          end
        end
      end
    end
  end
end

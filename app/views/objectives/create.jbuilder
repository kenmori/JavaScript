json.objective do
  json.partial!(@objective)

  json.parent_objective do
    json.partial!(@objective.parent_objective) if @objective.parent_objective
  end

  json.parent_key_result do
    json.partial!(@objective.parent_key_result) if @objective.parent_key_result
  end
end

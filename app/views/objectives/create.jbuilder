json.objective do
  json.partial!(@objective)

  json.parent_objective do
    json.partial!(@objective.parent_objective) if @objective.parent_objective
  end

  json.parent_key_result do
    json.partial!(@objective.parent_key_result) if @objective.parent_key_result
  end

  json.detached_parent_key_result do
    detached_parent_key_result = @objective.detached_parent_key_result
    json.partial!(detached_parent_key_result) if detached_parent_key_result
  end
end

json.objective do
  json.partial!(@objective)

  json.parent_key_result do
    json.partial!(@objective.parent_key_result) if @objective.parent_key_result
  end

  json.child_objectives do
    json.partial! 'objectives/objective', collection: @objective.child_objectives, as: :objective
  end
end

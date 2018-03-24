json.key_result do
  json.partial!(@key_result)

  json.objective do
    json.partial!(@key_result.objective)

    json.parent_key_result do
      json.partial!(@key_result.objective.parent_key_result) if @key_result.objective.parent_key_result
    end

    json.child_objectives do
      json.partial! 'objectives/objective', collection: @key_result.objective.child_objectives, as: :objective
    end
  end

  json.child_objectives do
    json.partial! 'objectives/objective', collection: @key_result.child_objectives, as: :objective
  end
end

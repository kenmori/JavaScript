json.key_result do
  json.partial!(@key_result)

  json.objective do
    json.partial!(@key_result.objective)
  end

  json.child_objectives do
    json.partial! 'objectives/objective', collection: @key_result.child_objectives, as: :objective
  end
end

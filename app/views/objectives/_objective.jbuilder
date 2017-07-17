json.id(objective.id)
json.name(objective.name)
json.description(objective.description)
json.key_results do
  json.array!(objective.key_results) do |key_result|
    json.partial!(key_result)
  end
end

json.child_objectives do
  json.array!(objective.child_objectives) do |objective|
    json.partial!(objective)
  end
end

json.extract! objective, :id, :name, :description, :owner_id, :progress_rate

json.owner do
  json.id objective.owner_id
  json.name objective.owner.user.name
  json.avatar_url objective.owner.user.avatar_url
end

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

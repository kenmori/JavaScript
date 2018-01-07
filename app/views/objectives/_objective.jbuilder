json.extract! objective, :id, :name, :description, :okr_period_id, :owner_id, :progress_rate, :parent_objective_id, :updated_at

json.owner do
  json.id objective.owner_id
  json.first_name objective.owner.user.first_name
  json.last_name objective.owner.user.last_name
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

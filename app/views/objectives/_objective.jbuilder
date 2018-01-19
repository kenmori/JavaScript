json.extract! objective, :id, :name, :description, :okr_period_id, :progress_rate, :parent_objective_id, :parent_key_result_id, :updated_at

json.is_full true

json.owner do
  json.extract! objective.owner, :id, :first_name, :last_name, :avatar_url
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

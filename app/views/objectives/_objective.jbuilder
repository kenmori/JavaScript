json.extract! objective, :id, :name, :description, :okr_period_id, :progress_rate, :parent_objective_id, :parent_key_result_id
json.updated_at objective.correct_updated_at
json.is_full true
json.child_objective_ids objective.child_objective_ids

json.owner do
  json.extract! objective.owner, :id, :first_name, :last_name, :avatar_url
end

json.key_results do
  json.partial! 'key_results/key_result', collection: objective.key_results, as: :key_result
end

json.extract! objective, :id, :name, :description, :okr_period_id, :progress_rate, :parent_key_result_id, :updated_at, :key_result_order
json.is_full true
json.parent_objective_id objective.parent_objective_id
json.child_objective_ids objective.child_objective_ids

json.owner do
  json.extract! objective.owner, :id, :first_name, :last_name, :avatar_url, :disabled
end

json.key_results do
  json.partial! 'key_results/key_result', collection: objective.key_results, as: :key_result
end

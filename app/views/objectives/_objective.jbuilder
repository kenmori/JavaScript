json.extract! objective, :id, :name, :description, :okr_period_id, :progress_rate, :parent_objective_id, :parent_key_result_id, :updated_at

json.is_full true

json.owner do
  json.extract! objective.owner, :id, :first_name, :last_name, :avatar_url
end

json.key_results do
  json.partial! 'key_results/key_result', collection: objective.key_results, as: :key_result
end

json.child_objectives do
  json.partial! 'objectives/objective', collection: objective.child_objectives, as: :objective
end
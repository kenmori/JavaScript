json.partial!(key_result)
json.child_objective_progress_rate key_result.child_objective_progress_rate
json.achievement_rate key_result.achievement_rate

json.child_objectives do
  json.partial! 'objectives/with_key_results', collection: key_result.child_objectives, as: :objective
end

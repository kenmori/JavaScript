json.partial!(objective)

json.key_results do
  json.partial! 'key_results/key_result', collection: objective.sorted_key_results, as: :key_result
end

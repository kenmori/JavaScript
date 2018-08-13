json.extract! objective, :id, :disabled

json.key_results do
  json.array! objective.key_results, :id, :disabled
end

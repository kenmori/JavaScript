json.objective do
  json.extract! @objective, :id, :disabled

  json.key_results do
    json.array! @objective.key_results, :id, :disabled
  end

  json.descendant_objectives do
    json.partial! 'objectives/descendant', collection: @objective.descendant_objectives, as: :objective
  end
end

json.key_result do
  json.extract! @key_result, :id, :disabled, :progress_rate, :sub_progress_rate

  objective = @key_result.objective
  json.objective do
    json.partial! 'objectives/progress_rate', objective: objective
  end

  json.descendant_objectives do
    json.partial! 'objectives/descendant', collection: @key_result.descendant_objectives, as: :objective
  end
end

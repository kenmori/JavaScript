# frozen_string_literal: true

json.objective do
  json.extract! @objective, :id, :disabled, :progress_rate, :sub_progress_rate

  json.key_results do
    json.array! @objective.key_results, :id, :disabled, :progress_rate, :sub_progress_rate
  end

  parent_key_result = @objective.parent_key_result
  if parent_key_result
    json.parent_key_result do
      json.partial! "key_results/progress_rate", key_result: parent_key_result
    end
  end

  json.descendant_objectives do
    json.partial! "objectives/descendant", collection: @objective.descendant_objectives, as: :objective
  end
end

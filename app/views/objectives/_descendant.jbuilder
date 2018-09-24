# frozen_string_literal: true

json.extract! objective, :id, :disabled, :progress_rate, :sub_progress_rate

json.key_results do
  json.array! objective.key_results, :id, :disabled, :progress_rate, :sub_progress_rate
end

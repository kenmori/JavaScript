# frozen_string_literal: true

json.partial! key_result

json.sub_progress_rate key_result.sub_progress_rate

json.connected_objectives do
  json.array!(key_result.connected_objectives) do |objective|
    json.extract! objective, :id, :progress_rate, :sub_progress_rate

    if objective.parent_key_result
      json.parent_key_result do
        json.extract! objective.parent_key_result, :id, :progress_rate, :sub_progress_rate
      end
    end
  end
end

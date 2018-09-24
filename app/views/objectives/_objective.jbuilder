# frozen_string_literal: true

json.extract! objective, :id, :name, :description, :okr_period_id, :progress_rate, :parent_key_result_id, :updated_at, :key_result_order, :disabled
json.is_full true
json.key_result_ids objective.sorted_key_result_ids

json.owner do
  json.extract! objective.owner, :id, :first_name, :last_name, :avatar_url, :disabled if objective.owner
end

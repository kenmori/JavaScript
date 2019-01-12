# frozen_string_literal: true

json.array! @key_results do |key_result|
  json.extract! key_result, :id, :name, :progress_rate, :status, :disabled

  json.owner do
    json.extract! key_result.owner, :id, :first_name, :last_name, :avatar_url, :disabled
  end

  json.members do
    json.array! key_result.members, :id, :first_name, :last_name, :avatar_url, :disabled
  end
end

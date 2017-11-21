json.extract! key_result, :id, :name, :objective_id, :target_value, :actual_value, :value_unit, :expired_date, :progress_rate

json.owner do
  json.id key_result.owner.user.owner_id
  json.name key_result.owner.user.name
  json.avatar_url key_result.owner.user.avatar_url
end

json.concerned_people do
  json.array!(key_result.concerned_people) do |person|
    json.extract! person.user, :id, :name, :avatar_url
  end
end
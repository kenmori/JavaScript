json.extract! key_result, :id, :name, :objective_id, :target_value, :actual_value, :value_unit, :expired_date, :progress_rate, :comments

json.owner do
  json.id key_result.owner.user.owner_id
  json.first_name key_result.owner.user.first_name
  json.last_name key_result.owner.user.last_name
  json.avatar_url key_result.owner.user.avatar_url
end

json.concerned_people do
  json.array!(key_result.concerned_people) do |person|
    json.extract! person.user, :id, :avatar_url
  end
end
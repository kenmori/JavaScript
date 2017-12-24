json.extract! key_result, :id, :name, :objective_id, :target_value, :actual_value, :value_unit, :expired_date, :progress_rate

json.owner do
  json.id key_result.owner.user.owner_id
  json.first_name key_result.owner.user.first_name
  json.last_name key_result.owner.user.last_name
  json.avatar_url key_result.owner.user.avatar_url
end

json.key_result_members do
  json.array!(key_result.key_result_members) do |person|
    json.extract! person.user, :id, :avatar_url
  end
end

json.comments do
  json.array!(key_result.comments) do |comment|
    json.id comment.id
    json.text comment.text
    json.updated_at comment.updated_at
    json.self_comment comment.user_id == current_user.id
    json.full_name comment.user.full_name
  end
end
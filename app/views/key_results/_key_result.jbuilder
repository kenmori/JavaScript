json.extract! key_result, :id, :name, :objective_id, :target_value, :actual_value, :value_unit, :expired_date, :progress_rate

json.is_progress_rate_linked key_result.progress_rate_linked?

json.child_objectives do
  json.array!(key_result.child_objectives) do |objective|
    json.partial!(objective)
  end
end

json.owner do
  json.id key_result.owner&.id
  json.first_name key_result.owner&.first_name
  json.last_name key_result.owner&.last_name
  json.avatar_url key_result.owner&.avatar_url
end

json.key_result_members do
  json.array!(key_result.members) do |user|
    json.extract! user, :id, :avatar_url
  end
end

json.comments do
  json.array!(key_result.comments.order('created_at DESC')) do |comment|
    json.id comment.id
    json.text comment.text
    json.updated_at comment.updated_at
    json.self_comment comment.user_id == current_user.id
    json.full_name comment.user.full_name
  end
end

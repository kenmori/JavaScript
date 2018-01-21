json.extract! key_result, :id, :name, :objective_id, :target_value, :actual_value, :value_unit, :expired_date, :progress_rate
json.is_full true
json.is_progress_rate_linked key_result.progress_rate_linked?

json.child_objectives do
  json.partial! 'objectives/objective', collection: key_result.child_objectives, as: :objective
end

json.owner do
  json.extract! key_result.owner, :id, :first_name, :last_name, :avatar_url if key_result.owner
end

json.key_result_members do
  json.array!(key_result.members) do |user|
    json.extract! user, :id, :first_name, :last_name, :avatar_url
  end
end

json.comments do
  # FIXME: プレゼンテーション層に直接クエリを記述しない
  json.array!(key_result.comments.order('created_at DESC')) do |comment|
    decorate!(comment)
    json.extract! comment, :id, :text, :updated_at
    json.self_comment comment.user_id == current_user.id
    json.full_name comment.user.full_name
  end
end

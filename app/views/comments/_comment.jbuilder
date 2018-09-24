json.extract! comment, :id, :text, :updated_at

json.editable comment.editable?

json.is_edited comment.created_at != comment.updated_at

json.label do
  if comment.key_result_comment_label.present?
    json.extract! comment.key_result_comment_label, :id, :name, :color
  end
end

json.user do
  json.extract! comment.user, :id, :first_name, :last_name, :avatar_url, :disabled
end

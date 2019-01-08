# frozen_string_literal: true

json.extract! comment, :id, :text, :show_meeting_board, :updated_at

json.editable comment.editable?

json.is_edited comment.created_at != comment.updated_at

json.user do
  json.extract! comment.user, :id, :first_name, :last_name, :avatar_url, :disabled
end

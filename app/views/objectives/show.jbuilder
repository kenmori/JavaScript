json.objective do
  json.partial!(@objective)

  json.key_result_progress_rate @objective.key_result_progress_rate

  parent_key_result = @objective.parent_key_result
  json.parent_key_result do
    json.partial! 'key_results/with_child_objectives', key_result: parent_key_result if parent_key_result
  end

  json.key_results do
    json.array!(@objective.key_results) do |key_result|
      json.partial! 'key_results/with_child_objectives', key_result: key_result

      json.result key_result.result

      json.comments do
        json.array!(key_result.comments) do |comment|
          json.extract! comment, :id, :text, :updated_at
          json.editable comment.editable?
          json.full_name comment.user.full_name
          json.is_edited comment.created_at != comment.updated_at
          json.user do
            json.extract! comment.user, :id, :first_name, :last_name, :full_name, :avatar_url, :disabled
          end
        end
      end
    end
  end
end

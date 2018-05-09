json.objective do
  json.partial!(@objective)

  json.parent_key_result do
    json.partial!(@objective.parent_key_result) if @objective.parent_key_result
  end

  json.key_results do
    json.array!(@objective.key_results) do |key_result|
      json.partial!(key_result)
      json.child_progress_rate key_result.child_progress_rate
      json.achievement_rate key_result.achievement_rate

      json.child_objectives do
        json.partial! 'objectives/with_key_result', collection: key_result.child_objectives, as: :objective
      end

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

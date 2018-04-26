json.objective do
  json.partial!(@objective)

  parent_key_result = @objective.parent_key_result
  if parent_key_result
    json.parent_key_result do
      json.partial!(parent_key_result)

      json.child_objectives do
        json.partial! 'objectives/with_key_result', collection: parent_key_result.child_objectives, as: :objective
      end
    end
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
        end
      end
    end
  end
end

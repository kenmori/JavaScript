json.objective do
  json.partial!(@objective)

  json.parent_key_result do
    json.partial!(@objective.parent_key_result) if @objective.parent_key_result
  end

  json.key_results do
    json.array!(@objective.sorted_key_results) do |key_result|
      json.partial!(key_result)

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

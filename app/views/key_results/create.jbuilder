json.key_result do
  json.partial!(@key_result)

  json.result @key_result.result
  json.is_processed @key_result.processed?
  json.achievement_rate @key_result.achievement_rate

  objective = @key_result.objective
  json.objective do
    json.partial! 'objectives/progress_rate', objective: objective
    json.sub_progress_rate objective.sub_progress_rate
  end

  detached_objective = @key_result.detached_objective
  json.detached_objective do
    json.partial! 'objectives/progress_rate', objective: detached_objective if detached_objective
  end

  json.comments do
    json.array!(@key_result.comments) do |comment|
      json.extract! comment, :id, :text, :updated_at
      json.editable comment.editable?
      json.is_edited comment.created_at != comment.updated_at
      json.user do
        json.extract! comment.user, :id, :first_name, :last_name, :avatar_url, :disabled
      end
    end
  end
end

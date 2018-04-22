json.key_result do
  json.partial!(@key_result)

  objective = @key_result.objective
  json.objective do
    json.partial! 'objectives/progress_rate', objective: objective
  end

  detached_objective = @key_result.detached_objective
  json.detached_objective do
    json.partial! 'objectives/progress_rate', objective: detached_objective if detached_objective
  end

  json.comments do
    json.array!(@key_result.comments) do |comment|
      json.extract! comment, :id, :text, :updated_at
      json.editable comment.editable?
      json.full_name comment.user.full_name
    end
  end
end

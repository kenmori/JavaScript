json.key_result do
  json.partial! @key_result

  json.result @key_result.result
  json.is_processed @key_result.processed?
  json.achievement_rate @key_result.achievement_rate

  objective = @key_result.objective
  json.objective do
    json.partial! 'objectives/progress_rate', objective: objective
  end

  detached_objective = @key_result.detached_objective
  json.detached_objective do
    json.partial! 'objectives/progress_rate', objective: detached_objective if detached_objective
  end

  json.comments do
    json.partial! 'comments/comment', collection: @key_result.comments, as: :comment
  end
end

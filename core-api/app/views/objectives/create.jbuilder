# frozen_string_literal: true

json.objective do
  json.partial! "objectives/with_key_results", objective: @objective

  json.sub_progress_rate @objective.sub_progress_rate

  parent_key_result = @objective.parent_key_result
  if parent_key_result
    json.parent_key_result do
      json.partial! "key_results/progress_rate", key_result: parent_key_result
      json.is_processed parent_key_result.processed?
    end
  end

  detached_parent_key_result = @objective.detached_parent_key_result
  json.detached_parent_key_result do
    json.partial! "key_results/progress_rate", key_result: detached_parent_key_result if detached_parent_key_result
  end

  json.comments do
    json.partial! "comments/objective_comment", collection: @objective.objective_comments, as: :comment
  end

  json.department do
    json.partial! "departments/department", department: @department
  end
end

# frozen_string_literal: true

json.objective do
  json.partial! @objective

  json.sub_progress_rate @objective.sub_progress_rate

  parent_key_result = @objective.parent_key_result
  json.parent_key_result do
    json.partial! "key_results/with_child_objectives", key_result: parent_key_result if parent_key_result
  end

  json.comments do
    json.partial! "comments/objective_comment", collection: @objective.objective_comments, as: :comment
  end

  json.key_results do
    json.array!(@objective.key_results) do |key_result|
      json.partial! "key_results/with_child_objectives", key_result: key_result

      json.result key_result.result

      puts "== #{key_result.inspect}"

      json.comments do
        json.partial! "comments/comment", collection: key_result.comments, as: :comment
      end
    end
  end
end

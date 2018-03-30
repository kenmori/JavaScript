module ObjectiveDecorator
  def parent_objective_id
    parent_key_result&.objective_id
  end

  def parent_objective
    parent_key_result&.objective
  end

  def child_objective_ids
    key_results.includes(:child_objectives).flat_map { |key_result| key_result.child_objective_ids }
  end

  def child_objectives
    key_results.includes(:child_objectives).flat_map { |key_result| key_result.child_objectives }
  end

  def progress_rate_connected?
    !key_results.empty? && progress_rate_in_database.nil? # KR を持ち進捗率が未設定の場合は true
  end

  def connected_key_results(key_results = [], connected_key_result = parent_key_result)
    if connected_key_result
      key_results.push(connected_key_result)
      objective = connected_key_result.objective
      if objective.progress_rate_connected?
        return connected_key_results(key_results, objective.parent_key_result)
      end
    end
    return key_results
  end

  def detached_parent_key_result
    if saved_change_to_parent_key_result_id? && parent_key_result_id_before_last_save
      KeyResult.find(parent_key_result_id_before_last_save)
    end
  end
end

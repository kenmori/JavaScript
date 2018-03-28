module KeyResultDecorator
  def progress_rate_connected?
    !child_objectives.empty? && progress_rate_in_database.nil? # 子 Objective を持ち進捗率が未設定の場合は true
  end

  def connected_objectives(objectives = [], connected_objective = objective)
    objectives.push(connected_objective)
    parent_key_result = connected_objective.parent_key_result
    if parent_key_result&.progress_rate_connected?
      return connected_objectives(objectives, parent_key_result.objective)
    end
    return objectives
  end

  def detached_objective
    if saved_change_to_objective_id? && objective_id_before_last_save
      Objective.find(objective_id_before_last_save)
    end
  end
end

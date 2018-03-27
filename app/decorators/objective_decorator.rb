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

  def detached_parent_key_result
    if saved_change_to_parent_key_result_id? && parent_key_result_id_before_last_save
      KeyResult.find(parent_key_result_id_before_last_save)
    end
  end
end

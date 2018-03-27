module KeyResultDecorator
  def detached_objective
    if saved_change_to_objective_id? && objective_id_before_last_save
      Objective.find(objective_id_before_last_save)
    end
  end
end

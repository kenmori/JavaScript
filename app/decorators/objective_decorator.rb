module ObjectiveDecorator
  def progress_rate
    # 進捗率が未設定の場合は紐付く Key Result の進捗率から算出する
    progress_rate_in_database || key_result_progress_rate || 0
  end

  def key_result_progress_rate
    key_results.size == 0 ? nil
        : key_results.reduce(0) { |sum, key_result| sum + key_result.progress_rate } / key_results.size
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

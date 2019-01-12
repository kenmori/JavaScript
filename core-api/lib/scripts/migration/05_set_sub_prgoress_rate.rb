# frozen_string_literal: true

class SetSubProgressRate
  def self.execute
    print "Do you set sub_progress_rate to each O/KRs? [YES/no] "
    loop do
      case gets.chomp!
      when "YES"
        break
      when "NO", "no", "n"
        puts "Cancel the program."
        return 1
      else
        print "Type 'YES' or 'no': "
      end
    end

    Objective.all.each do |objective|
      objective.key_results.each do |key_result|
        new_sub_progress_rate = get_key_result_sub_progress_rate(key_result)
        key_result.update_column(:sub_progress_rate, new_sub_progress_rate)
      end
      new_sub_progress_rate = get_objective_sub_progress_rate(objective)
      objective.update_column(:sub_progress_rate, new_sub_progress_rate)
      print "."
    end
    print "\n"

    puts "All sub_progress_rate have been updated successfully."
  end

  def self.get_objective_progress_rate(objective)
    # 進捗率が未設定の場合は紐付く Key Result の進捗率から算出する
    objective.progress_rate_in_database || get_objective_sub_progress_rate(objective) || 0
  end

  def self.get_objective_sub_progress_rate(objective)
    objective.key_results.empty? ? nil
        : objective.key_results.reduce(0) { |sum, key_result| sum + get_key_result_progress_rate(key_result) } / objective.key_results.size
  end

  def self.get_key_result_progress_rate(key_result)
    # 進捗率が未設定の場合は子 Objective の進捗率から算出する
    key_result.progress_rate_in_database || get_key_result_sub_progress_rate(key_result) || 0
  end

  def self.get_key_result_sub_progress_rate(key_result)
    key_result.child_objectives.empty? ? nil
        : key_result.child_objectives.reduce(0) { |sum, objective| sum + get_objective_progress_rate(objective) } / key_result.child_objectives.size
  end
end

SetSubProgressRate.execute

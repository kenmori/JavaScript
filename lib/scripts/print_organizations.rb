class PrintOrganizations
  def self.execute
    puts ''
    index = 0
    Organization.all.each do |organization|
      index += 1
      puts "#{index}. #{organization.name} (id=#{organization.id})"

      users = organization.users
      puts "  - #{users.count} users (#{users.where(disabled: false).count} enabled, #{users.where(disabled: true).count} disabled)"

      organization.okr_periods.each do |okr_period|
        objective_count = okr_period.objectives.count
        objective_progress_rate_average = objective_count == 0 ? '-'
            : okr_period.objectives.reduce(0) { |sum, objective| sum + objective.progress_rate } / objective_count
        key_result_count = okr_period.key_results.count
        key_result_progress_rate_average = key_result_count == 0 ? '-'
            : okr_period.key_results.reduce(0) { |sum, key_result| sum + key_result.progress_rate } / key_result_count

        puts "  - [#{okr_period.name}]"
        puts "    - #{objective_count} objectives (average progress rate: #{objective_progress_rate_average}%)"
        puts "    - #{key_result_count} key results (average progress rate: #{key_result_progress_rate_average}%)"
      end
    end
    puts ''
    puts 'Done.'
  end
end

PrintOrganizations.execute

class PrintOrganizations
  def self.execute
    enabled_user_count = User.where(disabled_at: nil).count
    disabled_user_count = User.where.not(disabled_at: nil).count
    active_user_count_last_month = User.where(current_sign_in_at: 1.month.ago..Time.current).count
    active_user_count_last_week = User.where(current_sign_in_at: 1.week.ago..Time.current).count
    new_user_count_last_month = User.where(created_at: 1.month.ago..Time.current).count
    new_user_count_last_week = User.where(created_at: 1.week.ago..Time.current).count
    active_user_rate_last_month = (active_user_count_last_month * 100.0 / enabled_user_count).round(1)
    active_user_rate_last_week = (active_user_count_last_week * 100.0 / enabled_user_count).round(1)
    new_user_rate_last_month = (new_user_count_last_month * 100.0 / enabled_user_count).round(1)
    new_user_rate_last_week = (new_user_count_last_week * 100.0 / enabled_user_count).round(1)

    puts 'Showing organization information...'
    puts ''
    puts "- #{Organization.count} organizations"
    puts "- #{User.count} users (#{enabled_user_count} enabled, #{disabled_user_count} disabled)"
    puts "  - #{active_user_count_last_month} active users in the last month (#{active_user_rate_last_month}%)"
    puts "  - #{active_user_count_last_week} active users in the last week (#{active_user_rate_last_week}%)"
    puts "  - #{new_user_count_last_month} new users in the last month (#{new_user_rate_last_month}%)"
    puts "  - #{new_user_count_last_week} new users in the last week (#{new_user_rate_last_week}%)"
    puts ''
    index = 0
    Organization.all.each do |organization|
      index += 1
      puts "#{index}. #{organization.name} (id=#{organization.id})"

      users = organization.users
      enabled_user_count = users.where(disabled_at: nil).count
      disabled_user_count = users.where.not(disabled_at: nil).count
      active_user_count_last_month = users.where(current_sign_in_at: 1.month.ago..Time.current).count
      active_user_count_last_week = users.where(current_sign_in_at: 1.week.ago..Time.current).count
      active_user_rate_last_month = (active_user_count_last_month * 100.0 / enabled_user_count).round(1)
      active_user_rate_last_week = (active_user_count_last_week * 100.0 / enabled_user_count).round(1)
      puts "  - #{users.count} users (#{enabled_user_count} enabled, #{disabled_user_count} disabled)"
      puts "    - #{active_user_count_last_month} active users in the last month (#{active_user_rate_last_month}%)"
      puts "    - #{active_user_count_last_week} active users in the last week (#{active_user_rate_last_week}%)"

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

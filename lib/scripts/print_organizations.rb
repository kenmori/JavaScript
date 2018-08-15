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
        objectives = okr_period.objectives.enabled
        objective_progress_rate_average = objectives.count == 0 ? '-'
            : objectives.reduce(0) { |sum, objective| sum + objective.progress_rate } / objectives.count
        key_results = okr_period.key_results.enabled
        key_result_progress_rate_average = key_results.count == 0 ? '-'
            : key_results.reduce(0) { |sum, key_result| sum + key_result.progress_rate } / key_results.count

        puts "  - [#{okr_period.name}]"
        puts "    - #{objectives.count} objectives (average progress rate: #{objective_progress_rate_average}%)"
        puts "    - #{key_results.count} key results (average progress rate: #{key_result_progress_rate_average}%)"
      end
    end
    puts ''
    puts 'Done.'
  end
end

PrintOrganizations.execute

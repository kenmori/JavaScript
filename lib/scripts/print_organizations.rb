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
        puts "  - #{okr_period.objectives.count} objectives, #{okr_period.key_results.count} key results (#{okr_period.name})"
      end
    end
    puts ''
    puts 'Done.'
  end
end

PrintOrganizations.execute

class PrintUsers
  def self.execute
    puts ''
    Organization.all.each do |organization|
      puts "#{organization.id} - #{organization.name} (#{organization.users.first&.email})"
    end
    puts ''

    puts 'Enter the ID of the organization you want to delete permanently.'
    print 'ID: '
    organization_id = gets.chomp!
    organization = Organization.find_by(id: organization_id)
    if organization.nil?
      puts "Not found a organization whose ID is #{organization_id}!"
      return 1
    end

    puts "Showing #{organization.name}'s users information..."
    puts ''
    index = 0
    organization.users.each do |user|
      index += 1
      objectives = user.objectives
      key_results = user.key_results
      puts "#{index}. #{user.last_name} #{user.first_name} (#{user.email})"
      puts "   - #{objectives.count} objectives (#{objectives.enabled.count} enabled, #{objectives.disabled.count} disabled)"
      puts "   - #{key_results.count} key results (#{key_results.enabled.count} enabled, #{key_results.disabled.count} disabled, #{key_results.unprocessed.count} unprocessed)"
      puts "   - created at #{user.created_at.strftime('%Y-%m-%d')}"
      puts "   - sign in at #{user.sign_in_at.strftime('%Y-%m-%d %H:%M')}" if user.sign_in_at
      puts "   - disabled at #{user.disabled_at.strftime('%Y-%m-%d')}" if user.disabled_at
    end
    puts ''
    puts 'Done.'
  end
end

PrintUsers.execute

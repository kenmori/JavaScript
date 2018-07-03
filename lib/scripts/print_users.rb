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
      created_at = ", created at #{user.created_at.strftime('%Y-%m-%d')}"
      disabled_at = user.disabled ? ", disabled (updated) at #{user.updated_at.strftime('%Y-%m-%d')}" : ''
      puts "#{index}. #{user.email}#{created_at}#{disabled_at}"
    end
    puts ''
    puts 'Done.'
  end
end

PrintUsers.execute

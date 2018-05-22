class CreateUsers
  def self.execute
    puts ''
    Organization.all.each do |organization|
      puts "#{organization.id} - #{organization.name} (#{organization.uniq_name})"
    end
    puts ''

    puts 'Enter the ID of the organization you want to add users to.'
    print 'ID: '
    organization_id = gets.chomp!
    organization = Organization.find_by(id: organization_id)
    if organization.nil?
      puts "Not found a organization whose ID is #{organization_id}!"
      return 1
    end

    puts 'How many enabled users do you want to add?'
    print 'Number: '
    enabled_number = gets.chomp!.to_i
    puts 'How many disabled users do you want to add?'
    print 'Number: '
    disabled_number = gets.chomp!.to_i

    puts ''
    puts "Organization: #{organization.name} (#{organization.uniq_name})"
    puts "Enabled users: #{enabled_number}"
    puts "Disabled users: #{disabled_number}"
    puts ''

    print 'Do you want to add users to the above? [YES/no] '
    while true do
      case gets.chomp!
        when 'YES'
          break
        when 'NO', 'no', 'n'
          puts 'Cancel the program.'
          return 1
        else
          print "Type 'YES' or 'no': "
      end
    end

    begin
      ActiveRecord::Base.transaction do
        name = ('a'..'z').to_a.sample(4).join
        enabled_number.times do |i|
          index = i + 1
          organization.users.create!(
              first_name: index.to_s,
              last_name: name,
              email: "#{name}#{index}@example.com",
              password: 'Pass0123',
              confirmed_at: Time.now,
          )
        end
        disabled_number.times do |i|
          index = enabled_number + i + 1
          organization.users.create!(
              first_name: index.to_s,
              last_name: name,
              email: "#{name}#{index}@example.com",
              password: 'Pass0123',
              disabled: true,
              confirmed_at: Time.now,
              )
        end
      end
    rescue => e
      puts "Error: #{e.message}"
      return 1
    end

    puts "The #{enabled_number + disabled_number} users have been added to #{organization.name} successfully."
  end
end

CreateUsers.execute

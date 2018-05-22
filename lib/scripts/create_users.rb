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

    print "Do you want to add users to #{organization.name}? [YES/no] "
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

    puts 'How many users do you want to add?'
    print 'Number: '
    number = gets.chomp!
    print 'Do you make added users disabled? [YES/no] '
    disabled = gets.chomp! == 'YES'
    

    begin
      ActiveRecord::Base.transaction do
        name = ('a'..'z').to_a.sample(4).join
        number.to_i.times do |i|
          organization.users.create!(
              first_name: (i + 1).to_s,
              last_name: name,
              email: "#{name}#{i + 1}@example.com",
              password: 'Pass0123',
              disabled: disabled,
              confirmed_at: Time.now,
          )
        end
      end
    rescue => e
      puts "Error: #{e.message}"
      return 1
    end

    puts "The #{number} users have been added to #{organization.name} successfully."
  end
end

CreateUsers.execute

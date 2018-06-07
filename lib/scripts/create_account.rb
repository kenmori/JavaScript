class CreateAccount
  def self.execute
    print 'Organization Name: '
    organization_name = gets.chomp!
    print 'Last [space] First Name: '
    user_name = gets.chomp!
    print 'Email: '
    email = gets.chomp!
    print 'Month to Start [yyyy-MM-dd]: '
    month_start = gets.chomp!

    last_name = user_name.split[0]
    first_name = user_name.split[1]
    password = SecureRandom.hex(4)
    month_end = Date.parse(month_start).months_since(3).yesterday.strftime('%Y-%m-%d')

    puts ''
    puts "Organization: #{organization_name}"
    puts "User Name: #{last_name} #{first_name}"
    puts "Email: #{email}"
    puts "Password: #{password}"
    puts "OKR Period: #{month_start} - #{month_end}"
    puts ''

    print 'Do you want to create the above account? [YES/no] '
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
        organization = Organization.create!(
            name: organization_name,
        )
        organization.users.create!(
            last_name: last_name,
            first_name: first_name,
            email: email,
            password: password,
            admin: true,
            confirmed_at: Time.now,
        )
        organization.okr_periods.create!(
            month_start: month_start,
            month_end: month_end,
        )
      end
    rescue => e
      puts "Error: #{e.message}"
      return 1
    end

    puts "The #{organization_name} account has been created successfully."
  end
end

CreateAccount.execute

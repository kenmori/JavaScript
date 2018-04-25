class ChangeUserPassword
  def self.execute
    puts 'Enter the email address of the user whose password you want to change.'
    print 'Email address: '
    email = gets.chomp!
    user = User.find_by(email: email)
    if user.nil?
      puts "Not found a user whose email address is '#{email}'!"
      return 1
    end

    user_name = "'#{user.first_name} #{user.last_name}'"
    print "Do you want to change password of #{user_name}? [YES/no] "
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

    puts "Enter new password of #{user_name}"
    print 'Password: '
    password = STDIN.noecho(&:gets).chomp!
    print "\n"
    print 'Confirmation: '
    confirmation = STDIN.noecho(&:gets).chomp!
    print "\n"
    if password != confirmation
      puts 'Not matched passwords!'
      return 1
    end

    begin
      ActiveRecord::Base.transaction do
        user.password = password
        user.skip_confirmation!
        user.save!
      end
    rescue => e
      puts "Error: #{e.message}"
      return 1
    end

    puts "The password of #{user_name} has been changed successfully."
  end
end

ChangeUserPassword.execute

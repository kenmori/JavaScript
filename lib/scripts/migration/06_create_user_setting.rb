# frozen_string_literal: true

class CreateUserSetting
  def self.execute
    print "Do you create user setting to all users? [YES/no] "
    loop do
      case gets.chomp!
      when "YES"
        break
      when "NO", "no", "n"
        puts "Cancel the program."
        return 1
      else
        print "Type 'YES' or 'no': "
      end
    end

    User.all.each do |user|
      user.create_user_setting! unless user.user_setting
      print "."
    end
    puts ""

    puts "All user settings have been created successfully."
  end
end

CreateUserSetting.execute

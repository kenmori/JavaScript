# frozen_string_literal: true

class DeleteUsers
  def self.execute
    loop do
      delete_user

      puts ""
      print "Delete another user? [yes/no] "
      loop do
        case gets.chomp!
        when "YES", "yes", "y"
          break
        when "NO", "no", "n"
          puts "Exit."
          return 1
        else
          print "Type 'yes' or 'no': "
        end
      end
    end
  end

  def self.delete_user
    puts "Enter the email address of the user to delete."
    print "Email address: "
    email = gets.chomp!
    user = User.find_by(email: email)
    if user.nil?
      puts "Not found a user whose email address is '#{email}'!"
      return
    end

    user_name = "'#{user.first_name} #{user.last_name}'"

    if user.objectives.exists? || user.key_results.exists?
      puts "#{user_name} cannot be deleted because it has one or more OKRs!"
      return
    end

    print "Are you sure you want to delete #{user_name}? [YES/no] "
    loop do
      case gets.chomp!
      when "YES"
        break
      when "NO", "no", "n"
        return
      else
        print "Type 'YES' or 'no': "
      end
    end

    begin
      ActiveRecord::Base.transaction do
        user.destroy!
      end
    rescue StandardError => e
      puts "Error: #{e.message}"
      return
    end

    puts "#{user_name} has been deleted successfully."
  end
end

DeleteUsers.execute

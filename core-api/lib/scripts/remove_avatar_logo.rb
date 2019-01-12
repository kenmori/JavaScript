# frozen_string_literal: true

class RemoveAvatarLogo
  def self.execute
    print "Do you want to remove all avatars and logos? [YES/no] "
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
      user.remove_avatar = true
      user.save!
    end

    Organization.all.each do |organization|
      organization.remove_logo = true
      organization.save!
    end

    puts "All avatars and logos have been removed successfully."
  end
end

RemoveAvatarLogo.execute

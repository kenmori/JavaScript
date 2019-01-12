# frozen_string_literal: true

class ProcessKeyResultMember
  def self.execute
    print "Do you update all KeyResult members to processed? [YES/no] "
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

    KeyResultMember.all.each do |member|
      member.update!(processed: true)
    end

    puts "All KeyResult members have been updated successfully."
  end
end

ProcessKeyResultMember.execute

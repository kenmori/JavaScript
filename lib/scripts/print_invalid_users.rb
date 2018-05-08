class PrintInvalidUsers
  def self.execute
    print 'Do you print all invalid users? [yes/no] '
    while true do
      case gets.chomp!
        when 'YES', 'yes', 'y'
          break
        when 'NO', 'no', 'n'
          puts 'Cancel the program.'
          return 1
        else
          print "Type 'yes' or 'no': "
      end
    end

    OrganizationMember.all.each do |member|
      puts "User ID: #{member.user_id}, Organization ID: #{member.organization_id}" unless member.user
    end
    GroupMember.all.each do |member|
      puts "User ID: #{member.user_id}, Group ID: #{member.group_id}" unless member.user
    end
    ObjectiveMember.all.each do |member|
      puts "User ID: #{member.user_id}, Objective ID: #{member.objective_id}" unless member.user
    end
    KeyResultMember.all.each do |member|
      puts "User ID: #{member.user_id}, KeyResult ID: #{member.key_result_id}" unless member.user
    end
    Comment.all.each do |comment|
      puts "User ID: #{comment.user_id}, KeyResult ID: #{comment.key_result_id}, Comment ID: #{comment.id}" unless comment.user
    end

    puts 'Done.'
  end
end

PrintInvalidUsers.execute

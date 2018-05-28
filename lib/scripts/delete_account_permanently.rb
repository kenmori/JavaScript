class DeleteAccountPermanently
  def self.execute
    puts 'Enter the organization UNIQUE name to delete permanently.'
    print 'Organization UNIQUE name: '
    uniq_name = gets.chomp!
    organization = Organization.find_by(uniq_name: uniq_name)
    if organization.nil?
      puts "Not found a organization whose unique name is '#{uniq_name}'!"
      return 1
    end

    organization_name = "'#{organization.name}'"
    print "Do you want to delete #{organization_name} permanently (YES/no)? "
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
        # User (ObjectiveOrder)
        organization.users.each do |user|
          user.destroy!
        end

        # Organization (OkrPeriod, Objective, KeyResult, Comment, Group)
        organization.destroy!
      end
    rescue => e
      puts "Error: #{e.message}"
      return 1
    end

    puts "All data of #{organization_name} has been deleted successfully."
  end
end

DeleteAccountPermanently.execute

# frozen_string_literal: true

class DeleteOrganization
  def self.execute
    puts ""
    Organization.all.each do |organization|
      puts "#{organization.id} - #{organization.name} (#{organization.users.first&.email})"
    end
    puts ""

    puts "Enter the ID of the organization to delete permanently."
    print "ID: "
    organization_id = gets.chomp!
    organization = Organization.find_by(id: organization_id)
    if organization.nil?
      puts "Not found a organization whose ID is #{organization_id}!"
      return 1
    end

    organization_name = "'#{organization.name}'"
    print "Do you want to delete #{organization_name} permanently (YES/no)? "
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

    begin
      ActiveRecord::Base.transaction do
        # Organization (OkrPeriod, Objective, KeyResult, Comment, Group, User, UserSetting, ObjectiveOrder)
        organization.destroy!
      end
    rescue StandardError => e
      puts "Error: #{e.message}"
      return 1
    end

    puts "All data of #{organization_name} has been deleted successfully."
  end
end

DeleteOrganization.execute

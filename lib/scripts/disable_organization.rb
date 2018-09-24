# frozen_string_literal: true

class DisableOrganization
  def self.execute
    puts ""
    Organization.all.each do |organization|
      puts "#{organization.id} - #{organization.name} (#{organization.users.first&.email})"
    end
    puts ""

    puts "Enter the ID of the organization to disable or enable."
    print "ID: "
    organization_id = gets.chomp!
    organization = Organization.find_by(id: organization_id)
    if organization.nil?
      puts "Not found a organization whose ID is #{organization_id}!"
      return 1
    end

    organization_name = "'#{organization.name}'"
    disabled = organization.disabled
    print "Do you want to #{disabled ? 'enable' : 'disable'} #{organization_name} (YES/no)? "
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
        organization.disabled_at = disabled ? nil : Time.current
        organization.save!
      end
    rescue StandardError => e
      puts "Error: #{e.message}"
      return 1
    end

    puts "#{organization_name} has been #{disabled ? 'enabled' : 'disabled'} successfully."
  end
end

DisableOrganization.execute

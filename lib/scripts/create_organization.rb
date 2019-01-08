# frozen_string_literal: true

class CreateOrganization
  def self.execute
    print "Organization Name: "
    organization_name = gets.chomp!
    print "Last [space] First Name: "
    user_name = gets.chomp!
    print "Email: "
    email = gets.chomp!
    print "Start Date [yyyy-MM-dd]: "
    start_date = gets.chomp!

    last_name = user_name.split[0]
    first_name = user_name.split[1]
    password = SecureRandom.hex(4)
    end_date = Date.parse(start_date).months_since(3).yesterday.strftime("%Y-%m-%d")

    puts ""
    puts "Organization: #{organization_name}"
    puts "User Name: #{last_name} #{first_name}"
    puts "Email: #{email}"
    puts "Password: #{password}"
    puts "OKR Period: #{start_date} - #{end_date}"
    puts ""

    print "Do you want to create the above account? [YES/no] "
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
        organization = Organization.create!(
          name: organization_name
        )
        owner = organization.users.create!(
          last_name: last_name,
          first_name: first_name,
          email: email,
          password: password,
          admin: true,
          confirmed_at: Time.current
        )
        organization.okr_periods.create!(
          start_date: start_date,
          end_date: end_date
        )
        Department::CreateDefault.call(
          organization_id: organization.id,
          owner_id: owner.id
        )
      end
    rescue StandardError => e
      puts "Error: #{e.message}"
      return 1
    end

    puts "The #{organization_name} account has been created successfully."
  end
end

CreateOrganization.execute

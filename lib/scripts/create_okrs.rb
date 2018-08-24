class CreateOkrs
  def self.execute
    puts ''
    Organization.all.each do |organization|
      puts "#{organization.id} - #{organization.name}"
    end
    puts ''

    puts 'Enter the ID of the organization you want to add OKRs to.'
    print 'ID: '
    organization_id = gets.chomp!
    organization = Organization.find_by(id: organization_id)
    if organization.nil?
      puts "Not found a organization whose ID is #{organization_id}!"
      return 1
    end

    puts ''
    organization.okr_periods.all.each do |okr_period|
      puts "#{okr_period.id} - #{okr_period.name}"
    end
    puts ''

    puts 'Enter the ID of the OKR period you want to add OKRs to.'
    print 'ID: '
    okr_period_id = gets.chomp!
    okr_period = organization.okr_periods.find_by(id: okr_period_id)
    if okr_period.nil?
      puts "Not found a OKR period whose ID is #{okr_period_id}!"
      return 1
    end

    puts ''
    organization.users.all.each do |user|
      puts "#{user.id} - #{user.first_name} #{user.last_name}"
    end
    puts ''

    puts 'Enter the ID of the user you want to add OKRs to.'
    print 'ID: '
    user_id = gets.chomp!
    user = organization.users.find_by(id: user_id)
    if user.nil?
      puts "Not found a OKR period whose ID is #{user_id}!"
      return 1
    end

    puts 'How many objectives do you want to add?'
    print 'Number: '
    objective_number = gets.chomp!
    puts 'How many key results do you want to add for each objective?'
    print 'Number: '
    key_result_number = gets.chomp!

    puts ''
    puts "Organization: #{organization.name}"
    puts "OKR Period: #{okr_period.name}"
    puts "User: #{user.first_name} #{user.last_name}"
    puts "OKRs: #{objective_number} objectives with #{key_result_number} key results"
    puts ''

    print 'Do you want to add OKRs to the above? [YES/no] '
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
        objective_number.to_i.times do |i|
          objective = user.objectives.create!(
              name: "O#{i + 1}",
              okr_period_id: okr_period_id,
          )

          key_result_number.to_i.times do |j|
            user.key_results.create!(
                name: "KR#{j + 1} (#{objective.name})",
                objective_id: objective.id,
                expired_date: okr_period.end_date,
            )
          end
        end
      end
    rescue => e
      puts "Error: #{e.message}"
      return 1
    end

    puts "The #{objective_number} objectives with #{key_result_number} key results have been created successfully."
  end
end

CreateOkrs.execute

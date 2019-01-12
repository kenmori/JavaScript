# frozen_string_literal: true

class MigrateObjectiveOrder
  def self.execute
    print "Do you migrate objective orders for each user? [YES/no] "
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
      next unless user.objective_order

      user.objective_orders.create!(
        okr_period_id: user.organization.current_okr_period.id,
        list: user.objective_order
      )
    end

    puts "All objective orders have been migrated successfully."
  end
end

MigrateObjectiveOrder.execute

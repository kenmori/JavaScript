class PrintInvalidOkrs
  def self.execute
    print 'Do you print all invalid OKRs? [yes/no] '
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

    Objective.all.each do |objective|
      # 責任者がいない Objective
      puts "Objective ID: #{objective.id}" unless objective.owner
    end
    KeyResult.all.each do |key_result|
      # 責任者がいない KeyResult
      puts "KeyResult ID: #{key_result.id}" unless key_result.owner

      key_result.child_objectives.each do |objective|
        # 下位 Objective 責任者が、上位 KR の責任者でも関係者でもない
        puts "Child Objective ID: #{objective.id}" unless objective.parent_key_result.key_result_members.exists?(user_id: objective.owner.id)
      end
    end

    puts 'Done.'
  end
end

PrintInvalidOkrs.execute

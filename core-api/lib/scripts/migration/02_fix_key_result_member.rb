# frozen_string_literal: true

class FixKeyResultMember
  def self.execute
    print "Do you fix KeyResult members to be set to parent KeyResult properly? [YES/no] "
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

    KeyResult.all.each do |key_result|
      key_result.child_objectives.each do |objective|
        owner_id = objective.owner.id
        key_result_members = objective.parent_key_result.key_result_members
        unless key_result_members.exists?(user_id: owner_id)
          # Objective 責任者が紐付く上位 KR の責任者または関係者でない場合は追加する
          key_result_members.create!(user_id: owner_id, role: :member)
        end
      end
    end

    puts "All KeyResult members have been fixed successfully."
  end
end

FixKeyResultMember.execute

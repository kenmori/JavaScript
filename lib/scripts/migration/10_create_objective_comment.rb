# frozen_string_literal: true

class CreateObjectiveCommentLabel
  def self.execute
    print "Would you like create objective comment label records? [YES/no] "
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

    # 全組織に対して初期マスタレコードを追加する
    ApplicationRecord.transaction do
      Organization.all.each do |organization|
        PresetObjectiveCommentLabels::Objective::DEFAULT_LABELS.each do |tag|
          next if ObjectiveCommentLabel.exists?(name: tag[:name], color: tag[:color], organization: organization)

          ObjectiveCommentLabel.create!(
            name: tag[:name],
            color: tag[:color],
            organization: organization
          )
        end
      end
    end

    puts "All organization has been successfully insert"
  end
end

CreateObjectiveCommentLabel.execute

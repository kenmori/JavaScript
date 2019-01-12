# frozen_string_literal: true

class CreateKeyResultCommentLabel
  def self.execute
    print "Would you like create comment label records? [YES/no] "
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
        PresetCommentLabels::KeyResult::DEFAULT_LABELS.each do |tag|
          next if KeyResultCommentLabel.exists?(name: tag[:name], color: tag[:color], organization: organization)

          KeyResultCommentLabel.create!(
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

CreateKeyResultCommentLabel.execute

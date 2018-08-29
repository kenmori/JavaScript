class SetUserDisabledAt
  def self.execute
    print 'Do you set disabled_at to all users? [YES/no] '
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

    User.where(disabled: true).each do |user|
      # 無効なユーザーの最終更新日時を disabled = true に変更した日時とみなす
      user.update_attribute(:disabled_at, user.updated_at)
      print '.'
    end
    puts ''

    puts 'All user disabled_at have been set successfully.'
  end
end

SetUserDisabledAt.execute

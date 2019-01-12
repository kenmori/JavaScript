# frozen_string_literal: true

class SetOrganizationOwner
  def self.execute
    print "Do you set organization owner to each organizations? [YES/no] "
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

    Organization.all.each do |organization|
      organization.organization_members.first.update(role: :owner) unless organization.owner
      print "."
    end
    puts ""

    puts "All organization owners have been set successfully."
  end
end

SetOrganizationOwner.execute

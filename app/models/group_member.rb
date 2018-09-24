class GroupMember < ApplicationRecord
  belongs_to :group
  belongs_to :user

  enum role: { owner: 0, member: 1 }
end

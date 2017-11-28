class GroupMember < ApplicationRecord
  belongs_to :group
  has_one :user
end

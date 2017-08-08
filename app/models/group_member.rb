class GroupMember < ApplicationRecord
  belongs_to :group
  has_one :user
  has_many :concerned_people
end

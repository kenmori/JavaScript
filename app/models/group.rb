class Group < ApplicationRecord
  has_many :group_members, dependent: :destroy
  has_many :users, through: :group_members

  def owner
    group_members.find_by(role: :owner).user
  end
end

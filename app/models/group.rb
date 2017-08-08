class Group < ApplicationRecord
  has_many :members, class_name: 'GroupMember'
  belongs_to :owner, optional: true
  enum kind: {
    organization: 0,
    general: 1
  }

  before_create do
    owner = Owner.create!(kind: :group_kind)
    self.owner_id = owner.id
  end
end

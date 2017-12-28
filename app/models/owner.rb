class Owner < ApplicationRecord
  has_many :objectives
  has_many :key_results
  has_one :user
  has_one :group

  enum kind: {
    user_kind: 1,
    group_kind: 2,
  }

  # organization returns belongs to parent organization
  def organization
    if user_kind?
      User.find_by(owner_id: id).organization
    else
      Organization.find_by(id: Group.find_by(owner_id: id).organization_id)
    end
  end
end

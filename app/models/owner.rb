class Owner < ApplicationRecord
  has_many :objectives
  has_many :key_results
  has_one :user
  has_one :group

  enum kind: {
    user_kind: 1,
    group_kind: 2,
  }
end

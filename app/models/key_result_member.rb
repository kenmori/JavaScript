class KeyResultMember < ApplicationRecord
  belongs_to :user
  belongs_to :key_result

  enum role: {member: 0, owner: 1}

  validates :user_id, :uniqueness => {:scope => :key_result_id}
end

class KeyResultMember < ApplicationRecord
  belongs_to :key_result
  belongs_to :user

  enum role: { owner: 0, member: 1 }

  validates :user_id, :uniqueness => {:scope => :key_result_id}
end

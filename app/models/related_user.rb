class RelatedUser < ApplicationRecord
  belongs_to :user
  belongs_to :key_result

  validates :user_id, :uniqueness => {:scope => :key_result_id}
end

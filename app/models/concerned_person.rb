class ConcernedPerson < ApplicationRecord
  belongs_to :user
  belongs_to :key_result
end

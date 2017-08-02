class KeyResult < ApplicationRecord
  belongs_to :objective
  belongs_to :owner
  has_many :plans
end

class KeyResult < ApplicationRecord
  belongs_to :objective
  has_many :plans
end

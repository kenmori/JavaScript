class KeyResult < ApplicationRecord
  belongs_to :objective
  belongs_to :owner
  has_many :plans

  validates :progress_rate, numericality: { less_than_or_equal_to: 100, only_integer: true }
end

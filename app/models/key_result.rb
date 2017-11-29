class KeyResult < ApplicationRecord
  has_many :comments, dependent: :destroy
  has_many :concerned_people, dependent: :destroy
  belongs_to :objective
  belongs_to :owner

  validates :progress_rate, numericality: { less_than_or_equal_to: 100, only_integer: true }
end

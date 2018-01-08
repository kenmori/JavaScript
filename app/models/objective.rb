class Objective < ApplicationRecord
  has_many :key_results
  has_many :child_objectives, class_name: 'Objective', foreign_key: :parent_objective_id, dependent: :nullify
  belongs_to :owner
  belongs_to :okr_period

  scope :tops, -> { where(parent_objective_id: nil) }

  validates :progress_rate, numericality: { less_than_or_equal_to: 100, only_integer: true }
end

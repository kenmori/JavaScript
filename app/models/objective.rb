class Objective < ApplicationRecord
  has_many :key_results
  has_many :child_objectives, class_name: 'Objective', foreign_key: :parent_objective_id, dependent: :nullify
  belongs_to :owner

  scope :tops, -> { where(parent_objective_id: nil) }
end

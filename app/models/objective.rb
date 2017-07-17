class Objective < ApplicationRecord
  has_many :key_results
  has_many :objective_owners
  has_many :child_objectives, class_name: 'Objective', foreign_key: :parent_objective_id

  scope :tops, -> { where(parent_objective_id: nil) }
end

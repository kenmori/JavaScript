class Objective < ApplicationRecord
  has_many :key_results
  has_many :objective_owners
end

class ObjectiveOrder < ApplicationRecord
  belongs_to :user
  belongs_to :okr_period
end
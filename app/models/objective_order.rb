# frozen_string_literal: true

class ObjectiveOrder < ApplicationRecord
  belongs_to :user
  belongs_to :okr_period
end

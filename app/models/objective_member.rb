# frozen_string_literal: true

class ObjectiveMember < ApplicationRecord
  belongs_to :objective
  belongs_to :user

  enum role: { owner: 0, member: 1 }
end

class Group < ApplicationRecord
  has_many :members
  belongs_to :owner
end

class Member < ApplicationRecord
  belongs_to :group
  belongs_to :user
  has_many :concerned_people
  has_many :roles
end

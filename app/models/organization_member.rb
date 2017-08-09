class OrganizationMember < ApplicationRecord
  belongs_to :organization
  has_one :user
  has_many :concerned_people
end

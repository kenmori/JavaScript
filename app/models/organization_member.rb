class OrganizationMember < ApplicationRecord
  belongs_to :organization
  belongs_to :user

  enum role: { owner: 0, member: 1 }
end

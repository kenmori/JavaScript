class Organization < ApplicationRecord
  has_many :groups
  has_many :members, class_name: 'OrganizationMember'
  has_many :okr_periods, class_name: 'OkrPeriod'

  after_create do
    self.groups.create!(name: self.name, kind: :organization)
  end

  def organization_group
    self.groups.organization.first
  end
end

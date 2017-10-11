class Organization < ApplicationRecord
  has_many :groups
  has_many :members, class_name: 'OrganizationMember'
  has_many :okr_periods
  has_one :okr_setting

  after_create do
    self.groups.create!(name: self.name, kind: :organization)
    self.okr_setting = OkrSetting.create!(organization_id: self.id)
  end

  def organization_group
    self.groups.organization.first
  end
end

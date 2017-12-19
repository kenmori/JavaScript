class Organization < ApplicationRecord
  validates :name, presence: true
  validates :uniq_name, presence: true, uniqueness: true, format: { with: /\A[a-z0-9_-]+\z/i }
  
  has_many :groups
  has_many :members, class_name: 'OrganizationMember'
  has_many :okr_periods
  has_one :okr_setting

  after_create do
    self.groups.create!(name: self.name, kind: :organization)
    self.create_okr_setting!
  end

  def organization_group
    self.groups.organization.first
  end

  def latest_okr_period_id
    self.okr_periods.active.pluck(:id).first
  end
end

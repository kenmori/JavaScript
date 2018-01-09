class Organization < ApplicationRecord
  validates :name, presence: true
  validates :uniq_name, presence: true, uniqueness: true, format: { with: /\A[a-z0-9_-]+\z/i }
  
  has_many :groups
  has_many :organization_members
  has_many :okr_periods

  mount_uploader :logo, LogoUploader

  after_create do
    self.okr_periods.create!(month_start: Date.today, month_end: Date.today.months_since(okr_span))
  end

  def current_okr_period
    self.okr_periods.current.first
  end

  def members
    self.organization_members.includes(:user).map(&:user)
  end
end

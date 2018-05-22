class Organization < ApplicationRecord
  validates :name, presence: true
  validates :uniq_name, presence: true, uniqueness: { case_sensitive: false }, format: { with: /\A[a-z0-9_-]+\z/ }

  has_many :groups
  has_many :organization_members
  has_many :users, through: :organization_members
  has_many :okr_periods

  mount_uploader :logo, LogoUploader

  def current_okr_period
    self.okr_periods.current.first || okr_periods.order(month_start: :desc).first
  end
end

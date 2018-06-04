class Organization < ApplicationRecord
  validates :name, presence: true

  has_many :groups, dependent: :destroy
  has_many :organization_members, dependent: :destroy
  has_many :users, through: :organization_members
  has_many :okr_periods, dependent: :destroy

  mount_uploader :logo, LogoUploader

  def current_okr_period
    self.okr_periods.current.first || okr_periods.order(month_start: :desc).first
  end
end

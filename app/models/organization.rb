class Organization < ApplicationRecord

  before_destroy :destroy_users # 関連付けの `dependent: :destroy` より先に定義する

  validates :name, presence: true

  has_many :groups, dependent: :destroy
  has_many :organization_members, dependent: :destroy
  has_many :users, through: :organization_members
  has_many :okr_periods, -> { order(:start_date) }, dependent: :destroy

  mount_uploader :logo, LogoUploader

  def owner
    organization_members.find_by(role: :owner)&.user
  end

  def current_okr_period
    self.okr_periods.current.first || okr_periods.last
  end

  private

  def destroy_users
    users.each do |user|
      user.destroy!
    end
  end
end

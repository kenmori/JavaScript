class Organization < ApplicationRecord

  around_destroy :destroy_orphaned_user # 関連付けの `dependent: :destroy` より先に定義する

  validates :name, presence: true

  has_many :groups, dependent: :destroy
  has_many :organization_members, dependent: :destroy
  has_many :users, through: :organization_members
  has_many :okr_periods, -> { order(:month_start) }, dependent: :destroy

  mount_uploader :logo, LogoUploader

  def owner
    organization_members.find_by(role: :owner)&.user
  end

  def current_okr_period
    self.okr_periods.current.first || okr_periods.last
  end

  private

  def destroy_orphaned_user
    users = self.users.to_a # ActiveRecord::Relation のままだと yield 後に空配列になるため to_a する
    yield
    users.each do |user|
      user.destroy! if user.organizations.empty? # 組織に所属していないユーザーは削除する
    end
  end
end

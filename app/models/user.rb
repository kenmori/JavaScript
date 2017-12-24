class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :timeoutable and :omniauthable
  devise :database_authenticatable, :recoverable, :rememberable, :trackable, :validatable, :confirmable, :lockable

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, uniqueness: true, format: { with: VALID_EMAIL_REGEX }
  validates :first_name, presence: true, length: { maximum: 255 }
  validates :last_name, presence: true, length: { maximum: 255 }

  has_many :objectives, primary_key: :owner_id, foreign_key: :owner_id
  has_many :concerned_people
  has_many :comments

  has_many :organization_member

  belongs_to :owner, optional: true

  before_create do
    owner = Owner.create!(kind: :user_kind)
    self.owner_id = owner.id
  end

  mount_uploader :avatar, AvatarUploader

  attr_accessor :no_password_required

  def self.create_user_with_organization!(organization_admin_user, user_params, organization_name, organization_uniq_name)
    transaction do
      user = User.create_with(user_params).find_or_create_by!(email: user_params['email'])
      if organization_admin_user.present?
        organization = organization_admin_user.organization
      else
        organization = Organization.create!(name: organization_name, uniq_name: organization_uniq_name)
      end
      OrganizationMember.find_or_create_by!(organization_id: organization.id, user_id: user.id)
      user
    end
  end

  def organization
    organization_id = self.current_organization_id || self.organization_member[0].organization_id
    OrganizationMember.find_by(organization_id: organization_id, user_id: self.id).organization
  end

  def organizations(organization_id = nil)
    OrganizationMember.where(user_id: self.id).includes(:organization).map(&:organization)
  end

  def full_name
    "#{last_name} #{first_name}"
  end

  def password_required?
    super if need_confirmed?
  end

  def need_confirmed?
    !no_password_required
  end

end

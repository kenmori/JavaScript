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

  has_one :organization_member

  belongs_to :owner, optional: true

  before_create do
    owner = Owner.create!(kind: :user_kind)
    self.owner_id = owner.id
  end

  mount_uploader :avatar, AvatarUploader

  attr_accessor :no_password_required

  def self.create_user_with_organization(user_params, no_password_required, organization_name, organization_uniq_name)
    user = new(user_params)
    user.no_password_required = no_password_required
    transaction do
      user.save!
      organization = Organization.new(name: organization_name,uniq_name: organization_uniq_name.downcase)
      organization.save!
      OrganizationMember.new(organization_id: organization.id, user_id: user.id).save!
    end
    user
  end

  def organization
    OrganizationMember.find_by(user_id: id).organization
  end

  def organization_members
    self.organization.members.includes(:user).map(&:user)
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

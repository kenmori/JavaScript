class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :timeoutable and :omniauthable
  devise :database_authenticatable, :recoverable, :rememberable, :trackable, :validatable, :confirmable, :lockable

  validates :first_name, presence: true, length: { maximum: 255 }
  validates :last_name, presence: true, length: { maximum: 255 }

  has_many :objectives, primary_key: :owner_id, foreign_key: :owner_id
  has_many :concerned_people

  has_one :organization_member
  delegate :organization, to: :organization_member

  belongs_to :owner, optional: true

  before_create do
    owner = Owner.create!(kind: :user_kind)
    self.owner_id = owner.id
  end

  mount_uploader :avatar, AvatarUploader

  attr_accessor :no_password

  def organization
    OrganizationMember.find_by(user_id: id).organization
  end

  def password_required?
    super if confirmed?
  end

  def confirmed?
    !no_password
  end
end

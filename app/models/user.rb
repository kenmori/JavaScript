class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :timeoutable and :omniauthable
  devise :database_authenticatable, :recoverable, :rememberable, :trackable, :validatable, :confirmable, :lockable

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, uniqueness: true, format: { with: VALID_EMAIL_REGEX }
  validates :first_name, presence: true, length: { maximum: 255 }
  validates :last_name, presence: true, length: { maximum: 255 }

  has_many :group_members, dependent: :destroy
  has_many :groups, through: :group_members
  has_many :objective_members, dependent: :destroy
  has_many :objectives, through: :objective_members
  has_many :key_result_members, dependent: :destroy
  has_many :key_results, through: :key_result_members
  has_many :unprocessed_key_results, -> { where(key_result_members: { processed: false }) }, through: :key_result_members, :source => :key_result 
  has_many :comments # destroy 時に何もしない
  has_many :organization_members, dependent: :destroy
  has_many :organizations, through: :organization_members
  has_many :objective_orders, dependent: :destroy
  has_one :user_setting, dependent: :destroy

  mount_uploader :avatar, AvatarUploader

  attr_accessor :require_password, :skip_notification

  before_create do
    skip_confirmation_notification! if skip_notification
  end

  after_create do
    create_user_setting!
  end

  def organization
    organizations.find_by(id: current_organization_id) || organizations.first
  end

  def password_required?
    super if confirmed? || require_password
  end

  def has_password?
    self.encrypted_password.present?
  end

  def active_for_authentication?
    super && !disabled
  end

  def inactive_message
    disabled ? :disabled : super
  end

  def disabled
    !!disabled_at
  end

  def sign_in_at
    current_sign_in_at # 注：last_sign_in_at は最終1つ前のログイン日時
  end

  # Override devise notification method
  def send_devise_notification(notification, *args)
    devise_mailer.send(notification, self, *args).deliver_later
  end

end

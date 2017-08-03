class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :timeoutable and :omniauthable
  devise :database_authenticatable, :recoverable, :rememberable, :trackable, :validatable, :confirmable, :lockable

  validates :name, presence: true, length: { maximum: 255 }

  has_many :members
  belongs_to :owner
end

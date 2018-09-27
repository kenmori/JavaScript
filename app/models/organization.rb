# frozen_string_literal: true

class Organization < ApplicationRecord
  before_destroy :destroy_users # 関連付けの `dependent: :destroy` より先に定義する

  validates :name, presence: true

  has_many :groups, dependent: :destroy
  has_many :organization_members, dependent: :destroy
  has_many :key_result_comment_labels, dependent: :destroy
  has_many :users, through: :organization_members
  has_many :okr_periods, -> { order(:start_date) }, dependent: :destroy

  after_create :create_key_result_comment_labels

  mount_uploader :logo, LogoUploader

  def owner
    organization_members.find_by(role: :owner)&.user
  end

  def current_okr_period
    okr_periods.current.first || okr_periods.last
  end

  def disabled
    !!disabled_at
  end

  private

    def destroy_users
      users.each(&:destroy!)
    end

    def create_key_result_comment_labels
      PresetCommentLabels::KeyResult::DEFAULT_LABELS.each do |tag|
        KeyResultCommentLabel.create!(
          name: tag[:name],
          color: tag[:color],
          organization: self
        )
      end
    end
end

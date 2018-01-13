class KeyResult < ApplicationRecord
  has_many :comments, dependent: :destroy
  has_many :key_result_members, dependent: :destroy
  has_many :users, through: :key_result_members
  has_many :child_objectives, class_name: 'Objective', foreign_key: :parent_key_result_id, dependent: :nullify
  belongs_to :okr_period
  belongs_to :objective

  validates :progress_rate,
            numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 100, only_integer: true },
            allow_nil: true

  before_validation do
    self.okr_period_id = objective.okr_period_id
  end

  def owner
    key_result_members.find_by(role: :owner)&.user
  end

  def members
    key_result_members.where(role: :member).map(&:user)
  end

  def progress_rate
    # 進捗率が未設定の場合は子 Objective の進捗率から算出する
    progress_rate_in_database || (child_objectives.size == 0 ? 0
        : child_objectives.reduce(0) { |sum, objective| sum + objective.progress_rate } / child_objectives.size)
  end

  def progress_rate_linked?
    progress_rate_in_database.nil? # 進捗率が未設定の場合は true
  end
end

class KeyResult < ApplicationRecord
  has_many :comments, dependent: :destroy
  has_many :key_result_members, dependent: :destroy
  has_many :child_objectives, class_name: 'Objective', foreign_key: :parent_key_result_id, dependent: :nullify
  belongs_to :okr_period
  belongs_to :objective
  belongs_to :owner

  validates :progress_rate,
            numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 100, only_integer: true },
            allow_nil: true

  def progress_rate
    # 進捗率が未設定の場合は子 Objective の進捗率から算出する
    super || (child_objectives.size == 0 ? 0
        : child_objectives.reduce(0) { |sum, objective| sum + objective.progress_rate } / child_objectives.size)
  end

  def progress_rate_linked?
    progress_rate_in_database.nil? # 進捗率が未設定の場合は true
  end
end

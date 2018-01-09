class Objective < ApplicationRecord
  has_many :key_results
  has_many :child_objectives, class_name: 'Objective', foreign_key: :parent_objective_id, dependent: :nullify
  belongs_to :owner
  belongs_to :okr_period

  scope :tops, -> { where(parent_objective_id: nil) }

  validates :progress_rate,
            numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 100, only_integer: true },
            allow_nil: true

  def progress_rate
    # 進捗率が未設定の場合は紐付く Key Result の進捗率から算出する
    progress_rate_in_database || (key_results.size == 0 ? 0
        : key_results.reduce(0) { |sum, key_result| sum + key_result.progress_rate } / key_results.size)
  end
end

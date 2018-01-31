class Objective < ApplicationRecord
  has_many :key_results
  has_many :child_objectives, class_name: 'Objective', foreign_key: :parent_objective_id, dependent: :nullify
  has_many :objective_members, dependent: :destroy
  has_many :users, through: :objective_members
  belongs_to :okr_period
  belongs_to :parent_objective, class_name: 'Objective', optional: true
  belongs_to :parent_key_result, class_name: 'KeyResult', optional: true

  validates :name, :okr_period_id, presence: true
  validates :progress_rate,
            numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 100, only_integer: true },
            allow_nil: true

  before_validation do
    self.parent_objective_id = parent_key_result&.objective_id
  end

  def owner
    objective_members.find_by(role: :owner)&.user
  end

  def progress_rate
    # 進捗率が未設定の場合は紐付く Key Result の進捗率から算出する
    progress_rate_in_database || (key_results.size == 0 ? 0
        : key_results.reduce(0) { |sum, key_result| sum + key_result.progress_rate } / key_results.size)
  end
end

class KeyResult < ApplicationRecord
  has_many :comments, dependent: :destroy
  has_many :key_result_members, dependent: :destroy
  has_many :users, through: :key_result_members
  has_many :child_objectives, class_name: 'Objective', foreign_key: :parent_key_result_id, dependent: :nullify
  belongs_to :okr_period
  belongs_to :objective

  validate :target_value_required_if_value_unit_exists, 
    :expired_date_can_be_converted_to_date
  validates :name, :objective_id, :okr_period_id, presence: true
  validates :target_value, numericality: {greater_than_or_equal_to: 0}, if: :target_value_present?
  validates :progress_rate,
            numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 100, only_integer: true },
            allow_nil: true

  before_validation do
    self.okr_period_id = objective.okr_period_id
  end

  def target_value=(value)
    value.tr!('０-９', '0-9') if value.is_a?(String)
    super(value)
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
    !child_objectives.empty? && progress_rate_in_database.nil?  # 子 Objective がいて進捗率が未設定の場合は true
  end

  def linked_objectives(objectives = [], linkedObjective = objective)
    objectives.push(linkedObjective)
    if linkedObjective.parent_key_result&.progress_rate_linked?
      linked_objectives(objectives, linkedObjective.parent_key_result.objective)
    else
      objectives
    end
  end

  def target_value_present?
    target_value.present?
  end

  def target_value_required_if_value_unit_exists
    if value_unit.present? && target_value.blank?
      errors.add(:target_value, "を入力してください")  
    end
  end

  def expired_date_can_be_converted_to_date
    if expired_date&.to_date.blank?
      errors.add(:expired_date, "の値が不正です")  
    end
  end
end

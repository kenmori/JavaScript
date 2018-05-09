class Objective < ApplicationRecord
  has_many :key_results
  has_many :objective_members, dependent: :destroy
  has_many :users, through: :objective_members
  belongs_to :okr_period
  belongs_to :parent_key_result, class_name: 'KeyResult', optional: true

  validates :name, :okr_period_id, presence: true
  validates :progress_rate,
            numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 100, only_integer: true },
            allow_nil: true

  def owner
    objective_members.find_by(role: :owner)&.user
  end

  def sorted_key_result_ids
    sorted_key_results.map(&:id)
  end

  def sorted_key_results
    return key_results unless key_result_order
    order = JSON.parse(key_result_order)
    index = order.size
    # KR 一覧を key_result_order 順に並べる (順番のない KR は後ろに並べていく)
    key_results.sort_by { |key_result| order.index(key_result.id) || index + 1 }
  end
end

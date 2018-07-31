class Objective < ApplicationRecord
  has_many :key_results, dependent: :destroy 
  has_many :objective_members, dependent: :destroy
  has_many :users, through: :objective_members
  belongs_to :okr_period
  belongs_to :parent_key_result, class_name: 'KeyResult', optional: true

  validates :name, :okr_period_id, presence: true
  validates :progress_rate,
            numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 100, only_integer: true },
            allow_nil: true

  after_save do
    parent_key_result.update_sub_progress_rate if parent_key_result # 上位進捗率の連動更新
    if saved_change_to_parent_key_result_id? & parent_key_result_id_before_last_save
      # 紐付け変更時は、変更前の上位進捗率も連動更新する
      KeyResult.find(parent_key_result_id_before_last_save).update_sub_progress_rate
    end
  end

  after_destroy do
    parent_key_result.update_sub_progress_rate if parent_key_result # 上位進捗率の連動更新
  end

  def progress_rate
    super || sub_progress_rate || 0
  end

  def update_sub_progress_rate
    # 下位進捗率を更新する (updated_at は更新しない)
    Objective.no_touching do
      new_sub_progress_rate = key_results.size == 0 ? nil
          : key_results.reduce(0) { |sum, key_result| sum + key_result.progress_rate } / key_results.size
      if progress_rate_in_database.nil?
        self.sub_progress_rate = new_sub_progress_rate
        save!(touch: false) # after_save コールバックを呼び出す
      else
        update_column(:sub_progress_rate, new_sub_progress_rate)
      end
    end
  end

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

  def disabled
    !!disabled_at
  end
end

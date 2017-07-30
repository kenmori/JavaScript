class Plan < ApplicationRecord
  belongs_to :key_result

  enum status: {
    not_yet: 1,
    doing: 2,
    done: 3
  }

  validates :status, presence: true, inclusion: {in: self.statuses.keys}
  # TODO:
  # 一旦プランで入力可能な文字数を500に設定する。
  validates :description, presence: true, length: {maximum: 500}

end

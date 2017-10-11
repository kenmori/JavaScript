class OkrSetting < ApplicationRecord
  belongs_to :organization

  after_create do
    reset
  end

  def reset
    update(
        year_end: 3,
        span: 3,
        ready_from: 20,
        ready_to: 1,
        review_during_from: 45,
        review_during_to: 50,
        review_end_from: 1,
        review_end_to: 7
    )
  end
end

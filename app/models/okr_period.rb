class OkrPeriod < ApplicationRecord
  belongs_to :organization

  scope :current, -> { where('month_start <= ? AND month_end >= ?', Date.today, Date.today) }
end

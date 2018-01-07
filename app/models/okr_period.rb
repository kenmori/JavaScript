class OkrPeriod < ApplicationRecord
  belongs_to :organization

  scope :current, -> { where('month_start <= ? AND month_end >= ?', Date.today, Date.today) }

  def name
    super || "#{month_start} ~ #{month_start.year == month_end.year ? month_end.strftime('%m-%d') : month_end}" # 2017-01-01 ~ 2018-12-31 or 2018-01-01 ~ 12-31
  end
end

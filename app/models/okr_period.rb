class OkrPeriod < ApplicationRecord
  belongs_to :organization
  has_many :objectives
  has_many :key_results

  scope :current, -> { where('month_start <= ? AND month_end >= ?', Date.today, Date.today) }

  def name
    default_name = "#{month_start} ~ #{month_start.year == month_end.year ? month_end.strftime('%m-%d') : month_end}" # 2017-01-01 ~ 2018-12-31 or 2018-01-01 ~ 12-31
    name_in_database.blank? ? default_name : name_in_database
  end
end

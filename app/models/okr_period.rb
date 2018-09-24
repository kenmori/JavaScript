class OkrPeriod < ApplicationRecord
  belongs_to :organization
  has_many :objectives, dependent: :destroy
  has_many :key_results, dependent: :destroy

  scope :current, -> { where('start_date <= ? AND end_date >= ?', Date.today, Date.today) }

  def name
    default_name = "#{start_date} ~ #{start_date.year == end_date.year ? end_date.strftime('%m-%d') : end_date}" # 2017-01-01 ~ 2018-12-31 or 2018-01-01 ~ 12-31
    name_in_database.blank? ? default_name : name_in_database
  end
end

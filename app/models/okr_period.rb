# frozen_string_literal: true

# ## Schema Information
#
# Table name: `okr_periods`
#
# ### Columns
#
# Name                   | Type               | Attributes
# ---------------------- | ------------------ | ---------------------------
# **`id`**               | `bigint(8)`        | `not null, primary key`
# **`end_date`**         | `date`             | `not null`
# **`name`**             | `string(255)`      |
# **`start_date`**       | `date`             | `not null`
# **`created_at`**       | `datetime`         | `not null`
# **`updated_at`**       | `datetime`         | `not null`
# **`organization_id`**  | `integer`          | `not null`
#

class OkrPeriod < ApplicationRecord
  belongs_to :organization
  has_many :objectives, dependent: :destroy
  has_many :key_results, dependent: :destroy

  scope :current, -> { where("start_date <= ? AND end_date >= ?", Time.zone.today, Time.zone.today) }

  def name
    default_name = "#{start_date} ~ #{start_date.year == end_date.year ? end_date.strftime('%m-%d') : end_date}" # 2017-01-01 ~ 2018-12-31 or 2018-01-01 ~ 12-31
    name_in_database.presence || default_name
  end
end

class OkrPeriod < ApplicationRecord
  belongs_to :organization
  enum status: { inactive: 0, active: 1 }
end

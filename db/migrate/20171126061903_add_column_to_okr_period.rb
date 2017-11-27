class AddColumnToOkrPeriod < ActiveRecord::Migration[5.1]
  def change
    add_column :okr_periods, :month_start, :date, null: false
    add_column :okr_periods, :month_end, :date, null: false
  end
end

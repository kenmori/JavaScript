class AddColumnToOkrPeriod < ActiveRecord::Migration[5.1]
  def change
    add_column :okr_periods, :month_start, :integer, null: false
    add_column :okr_periods, :month_end, :integer, null: false
  end
end

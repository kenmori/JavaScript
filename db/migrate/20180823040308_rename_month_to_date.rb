class RenameMonthToDate < ActiveRecord::Migration[5.1]
  def change
    rename_column :okr_periods, :month_start, :start_date
    rename_column :okr_periods, :month_end, :end_date
  end
end

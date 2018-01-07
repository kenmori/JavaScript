class AddOkrPeriodToKeyResults < ActiveRecord::Migration[5.1]
  def change
    add_column :key_results, :okr_period_id, :integer, null: false
  end
end

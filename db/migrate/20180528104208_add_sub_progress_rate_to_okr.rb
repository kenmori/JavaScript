class AddSubProgressRateToOkr < ActiveRecord::Migration[5.1]
  def change
    add_column :objectives, :sub_progress_rate, :integer
    add_column :key_results, :sub_progress_rate, :integer
  end
end

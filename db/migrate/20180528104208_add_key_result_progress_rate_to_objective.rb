class AddKeyResultProgressRateToObjective < ActiveRecord::Migration[5.1]
  def change
    add_column :objectives, :key_result_progress_rate, :integer
    add_column :key_results, :child_objective_progress_rate, :integer
  end
end

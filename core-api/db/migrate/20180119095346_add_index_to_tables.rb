class AddIndexToTables < ActiveRecord::Migration[5.1]
  def change
    add_index :comments, :key_result_id
    add_index :key_results, :objective_id
    add_index :key_result_members, :key_result_id
    add_index :objectives, :parent_key_result_id
    add_index :objectives, :parent_objective_id
    add_index :objective_members, :objective_id
    add_index :objective_members, :user_id
  end
end

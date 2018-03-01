class RemoveParentObjectiveIdFromObjectives < ActiveRecord::Migration[5.1]
  def change
    remove_index :objectives, :parent_objective_id
    remove_column :objectives, :parent_objective_id
  end
end

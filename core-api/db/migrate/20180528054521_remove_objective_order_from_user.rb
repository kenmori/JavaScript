class RemoveObjectiveOrderFromUser < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :objective_order
  end
end

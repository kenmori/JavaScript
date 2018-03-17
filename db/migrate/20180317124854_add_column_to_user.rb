class AddColumnToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :objective_order, :string
  end
end

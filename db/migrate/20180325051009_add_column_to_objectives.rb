class AddColumnToObjectives < ActiveRecord::Migration[5.1]
  def change
    add_column :objectives, :key_result_order, :string
  end
end

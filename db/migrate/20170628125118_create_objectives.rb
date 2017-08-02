class CreateObjectives < ActiveRecord::Migration[5.1]
  def change
    create_table :objectives do |t|
      t.string  :name, null: false
      t.string  :description
      t.integer :parent_objective_id
      t.integer :owner_id, null: false # 所有者ID

      t.timestamps
    end
  end
end

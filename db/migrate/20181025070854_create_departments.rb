class CreateDepartments < ActiveRecord::Migration[5.2]
  def change
    create_table :departments do |t|
      t.string :ancestry
      t.references :organization, foreign_key: true, null: false
      t.datetime :soft_destroyed_at
      t.string :name, null: false
      t.integer :display_order, null: false

      t.timestamps
    end
    add_index :departments, :ancestry
    add_index :departments, :soft_destroyed_at
    add_index :departments, :display_order
  end
end

class CreateObjectiveOwners < ActiveRecord::Migration[5.1]
  def change
    create_table :objective_owners do |t|
      t.integer :objective_id, null: false
      t.string :name

      t.timestamps
    end
  end
end

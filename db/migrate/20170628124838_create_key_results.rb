class CreateKeyResults < ActiveRecord::Migration[5.1]
  def change
    create_table :key_results do |t|
      t.string  :name,         null: false
      t.integer :objective_id, null: false
      t.integer :owner_id,     null: false
      t.timestamps
    end
  end
end

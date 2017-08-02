class CreateMembers < ActiveRecord::Migration[5.1]
  def change
    create_table :members do |t|
      t.timestamps
      t.integer :group_id, null: false
      t.integer :user_id,  null: false
    end

    add_index :members, [:group_id, :user_id], unique: true
  end
end

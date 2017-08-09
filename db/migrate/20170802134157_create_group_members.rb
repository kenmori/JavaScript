class CreateGroupMembers < ActiveRecord::Migration[5.1]
  def change
    create_table :group_members do |t|
      t.timestamps
      t.integer :group_id, null: false
      t.integer :user_id,  null: false
      t.index [:group_id, :user_id], unique: true
    end
  end
end

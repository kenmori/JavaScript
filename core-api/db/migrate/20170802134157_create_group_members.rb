class CreateGroupMembers < ActiveRecord::Migration[5.1]
  def change
    create_table :group_members do |t|
      t.integer :group_id, null: false
      t.integer :user_id,  null: false
      t.integer :role,     null: false, default: 0, limit: 1 # 権限: 責任者 (0), 所属 (1)

      t.timestamps
    end
  end
end

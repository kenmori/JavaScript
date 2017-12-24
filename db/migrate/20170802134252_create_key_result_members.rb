class CreateKeyResultMembers < ActiveRecord::Migration[5.1]
  def change
    create_table :key_result_members do |t|
      t.timestamps
      t.integer :key_result_id, null: false
      t.integer :user_id,       null: false
      t.integer :role,          null: false, default: 0, limit: 1 # 権限: 関係者 (0), 責任者 (1)
    end
  end
end

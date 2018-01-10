class CreateObjectiveMembers < ActiveRecord::Migration[5.1]
  def change
    create_table :objective_members do |t|
      t.integer :objective_id, null: false
      t.integer :user_id,      null: false
      t.integer :role,         null: false, default: 0, limit: 1 # 権限: 責任者 (0), 関係者 (1)

      t.timestamps
    end
  end
end

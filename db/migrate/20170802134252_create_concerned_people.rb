class CreateConcernedPeople < ActiveRecord::Migration[5.1]
  def change
    create_table :concerned_people do |t|
      t.timestamps
      t.integer :key_result_id, null: false
      t.integer :member_id,     null: false # メンバーID
      t.integer :role,          null: false # 権限: 責任者 OR 一般関係者
    end
  end
end

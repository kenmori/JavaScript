class CreatePlans < ActiveRecord::Migration[5.1]
  def change
    create_table :plans do |t|
      t.timestamps
      t.integer    :key_result_id,       null: false               # KeyResultのID
      t.string     :description,         null: false               # 詳細内容
      t.integer    :status,              null: false, default: 1   # ステータス: 未着手(1), 進行中(2), 完了(2)
      t.integer    :concerned_person_id, null: false               # 関係者ID
      t.date       :deadline                                       # 期限
    end
  end
end

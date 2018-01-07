class CreateObjectives < ActiveRecord::Migration[5.1]
  def change
    create_table :objectives do |t|
      t.string  :name, null: false
      t.text    :description
      t.integer :parent_objective_id
      t.integer :parent_key_result_id
      t.integer :owner_id, null: false # 所有者ID
      t.integer :okr_period_id, null: false # OKR期間ID
      t.integer :progress_rate # 進捗率

      t.timestamps
      t.index :created_at
    end
  end
end

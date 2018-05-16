class CreateKeyResults < ActiveRecord::Migration[5.1]
  def change
    create_table :key_results do |t|
      t.string  :name,          null: false
      t.integer :objective_id,  null: false
      t.integer :okr_period_id, null: false
      t.integer :progress_rate # 進捗率
      t.float :target_value
      t.float :actual_value
      t.string  :value_unit
      t.date :expired_date

      t.timestamps
      t.index :created_at
    end
  end
end
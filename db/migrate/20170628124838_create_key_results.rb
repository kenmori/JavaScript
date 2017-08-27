class CreateKeyResults < ActiveRecord::Migration[5.1]
  def change
    create_table :key_results do |t|
      t.string  :name,          null: false
      t.integer :objective_id,  null: false
      t.integer :owner_id,      null: false
      t.integer :progress_rate, null: false, default: 0 # 進捗率
      t.integer :target_value
      t.integer :actual_value
      t.string  :value_unit
      t.text :memo
      t.date :expired_date
      t.timestamps
    end
  end
end

class CreateOkrSettings < ActiveRecord::Migration[5.1]
  def change
    create_table :okr_settings do |t|
      t.integer :organization_id, null: false
      t.integer :year_end
      t.integer :span
      t.integer :ready_from
      t.integer :ready_to
      t.integer :review_during_from
      t.integer :review_during_to
      t.integer :review_end_from
      t.integer :review_end_to

      t.timestamps
      t.index :organization_id
    end
  end
end

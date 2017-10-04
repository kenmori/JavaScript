class CreateSettings < ActiveRecord::Migration[5.1]
  def change
    create_table :settings do |t|
      t.references :organization, foreign_key: true
      t.integer :year_end
      t.integer :okr_span
      t.integer :okr_ready_from
      t.integer :okr_ready_to
      t.integer :okr_review_during_from
      t.integer :okr_review_during_to
      t.integer :okr_review_end_from
      t.integer :okr_review_end_to

      t.timestamps
    end
  end
end

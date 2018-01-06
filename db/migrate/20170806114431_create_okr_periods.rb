class CreateOkrPeriods < ActiveRecord::Migration[5.1]
  def change
    create_table :okr_periods do |t|
      t.timestamps
      t.integer :organization_id, null: false
      t.index   :organization_id
      t.date    :month_start,     null: false
      t.date    :month_end,       null: false
      t.string  :name
    end
  end
end

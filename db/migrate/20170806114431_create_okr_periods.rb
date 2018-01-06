class CreateOkrPeriods < ActiveRecord::Migration[5.1]
  def change
    create_table :okr_periods do |t|
      t.timestamps
      t.integer :organization_id, null: false
      t.integer :year,            null: false             # 年度
      t.integer :period_number,   null: false             # 第1期などの表現に使用する数字。4半期であれば1~4, 半期であれば1~2
      t.integer :status,          null: false, default: 0 # ステータス(アクティブ: 1, インアクティブ: 0) 現在のperiodであればアクティブ
      t.index   :organization_id
      t.date    :month_start,     null: false
      t.date    :month_end,       null: false
    end
  end
end

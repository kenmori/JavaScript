class CreateOrganizations < ActiveRecord::Migration[5.1]
  def change
    create_table :organizations do |t|
      t.timestamps
      t.string :name, null: false   # 組織名
      t.string :uniq_name, null: false
      t.string :logo
      t.integer :okr_span, null: false, default: 3  # OKR 期間
    end
  end
end

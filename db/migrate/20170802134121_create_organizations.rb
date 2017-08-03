class CreateOrganizations < ActiveRecord::Migration[5.1]
  def change
    create_table :organizations do |t|
      t.timestamps
      t.string :name, null: false   # 組織名
      t.string :postal_code         # 郵便番号
      t.string :address             # 住所
      t.string :phone_number        # 電話番号
    end
  end
end

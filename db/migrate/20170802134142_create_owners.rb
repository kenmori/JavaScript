class CreateOwners < ActiveRecord::Migration[5.1]
  def change
    create_table :owners do |t|
      t.timestamps
      t.integer :kind, null: false # 所有者の種別(グループORユーザー)
    end
  end
end

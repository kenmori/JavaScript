class CreateGroups < ActiveRecord::Migration[5.1]
  def change
    create_table :groups do |t|
      t.timestamps
      t.integer :organization_id, null: false # 組織のID
      t.string  :name,            null: false # グループ名(会社名、部門名、チーム名など)
      t.integer :owner_id,        null: false # 所有者ID
    end
  end
end

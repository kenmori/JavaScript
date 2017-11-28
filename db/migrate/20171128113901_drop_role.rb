class DropRole < ActiveRecord::Migration[5.1]
  def up
    drop_table :roles
  end

  def down
    create_table :roles do |t|
      t.timestamps
      t.integer :organization_member_id, null: false
      t.integer :kind, null: false
    end
  end
end

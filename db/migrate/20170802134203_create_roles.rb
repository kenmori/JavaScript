class CreateRoles < ActiveRecord::Migration[5.1]
  def change
    create_table :roles do |t|
      t.timestamps
      t.integer :member_id, null: false
      t.integer :kind,      null: false
    end
  end
end

class CreateOrganizationMembers < ActiveRecord::Migration[5.1]
  def change
    create_table :organization_members do |t|
      t.timestamps
      t.integer :organization_id, null: false
      t.integer :user_id,  null: false
      t.index [:organization_id, :user_id], unique:true
      t.index :user_id
    end
  end
end

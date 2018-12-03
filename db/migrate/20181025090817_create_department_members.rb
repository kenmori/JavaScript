class CreateDepartmentMembers < ActiveRecord::Migration[5.2]
  def change
    create_table :department_members do |t|
      t.integer :role
      t.references :department, foreign_key: true, null: false
      t.references :user, foreign_key: true, null: false

      t.timestamps
    end
  end
end

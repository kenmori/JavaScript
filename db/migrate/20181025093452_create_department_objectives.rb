class CreateDepartmentObjectives < ActiveRecord::Migration[5.2]
  def change
    create_table :department_objectives do |t|
      t.references :department, foreign_key: true, null: false
      t.references :objective, foreign_key: true, null: false

      t.timestamps
    end
  end
end

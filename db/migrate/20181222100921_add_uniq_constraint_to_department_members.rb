class AddUniqConstraintToDepartmentMembers < ActiveRecord::Migration[5.2]
  def change
    add_index(:department_members, [:department_id, :user_id], unique: true)
  end
end

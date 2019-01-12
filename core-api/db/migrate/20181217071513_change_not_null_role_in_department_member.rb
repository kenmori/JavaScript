class ChangeNotNullRoleInDepartmentMember < ActiveRecord::Migration[5.2]
  def change
    change_column_null(:department_members, :role, false)
  end
end

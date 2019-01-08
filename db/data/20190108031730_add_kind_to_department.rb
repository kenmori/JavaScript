class AddKindToDepartment < ActiveRecord::Migration[5.2]
  def up
    Department.where(kind: nil, name: '代表').update_all(kind: :first_root)
    Department.where(kind: nil).update_all(kind: :nomal)
  end

  def down
  end
end

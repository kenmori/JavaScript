class AddKindToDepartment < ActiveRecord::Migration[5.2]
  def change
    add_column :departments, :kind, :integer, defalut: 1
  end
end

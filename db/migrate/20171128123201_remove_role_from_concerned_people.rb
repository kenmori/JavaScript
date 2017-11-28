class RemoveRoleFromConcernedPeople < ActiveRecord::Migration[5.1]
  def up
    remove_column :concerned_people, :role
  end

  def down
    add_column :concerned_people, :role, :string, null: false
  end
end

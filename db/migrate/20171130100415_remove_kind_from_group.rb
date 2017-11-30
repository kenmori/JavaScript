class RemoveKindFromGroup < ActiveRecord::Migration[5.1]
  def up
    remove_column :groups, :kind
  end

  def down
    add_column :groups, :kind, :integer, null: false
  end
end

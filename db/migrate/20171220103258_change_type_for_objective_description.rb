class ChangeTypeForObjectiveDescription < ActiveRecord::Migration[5.1]
  def up
    change_column :objectives, :description, :text
  end

  def down
    change_column :objectives, :description, :string
  end
end

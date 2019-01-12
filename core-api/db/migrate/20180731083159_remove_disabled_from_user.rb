class RemoveDisabledFromUser < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :disabled
  end
end

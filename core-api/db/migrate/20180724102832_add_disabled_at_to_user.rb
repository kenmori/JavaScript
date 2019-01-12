class AddDisabledAtToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :disabled_at, :datetime
  end
end

class AddDisableAtToOkr < ActiveRecord::Migration[5.1]
  def change
    add_column :objectives, :disabled_at, :datetime
    add_column :key_results, :disabled_at, :datetime
  end
end

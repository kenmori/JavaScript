class AddDisableAtToOkr < ActiveRecord::Migration[5.1]
  def change
    add_column :objectives, :disabled_at, :datetime
    add_column :key_results, :disabled_at, :datetime
    add_column :user_settings, :show_disabled_okrs, :boolean, default: false, null: false
  end
end

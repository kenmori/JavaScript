class AddStatusToKeyResult < ActiveRecord::Migration[5.1]
  def change
    add_column :key_results, :status, :integer, default: 0, null: false, limit: 1
  end
end

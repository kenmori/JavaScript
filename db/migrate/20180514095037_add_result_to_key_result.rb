class AddResultToKeyResult < ActiveRecord::Migration[5.1]
  def change
    add_column :key_results, :result, :string
  end
end

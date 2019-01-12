class AddDescriptionToKeyResult < ActiveRecord::Migration[5.1]
  def change
    add_column :key_results, :description, :text
  end
end

class AddProcessedToKeyResultMember < ActiveRecord::Migration[5.1]
  def change
    add_column :key_result_members, :processed, :boolean, default: false, null: false
  end
end

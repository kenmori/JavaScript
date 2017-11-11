class RemoveMemoFromKeyResults < ActiveRecord::Migration[5.1]
  def up
    remove_column :key_results, :memo
  end

  def down
    add_column :key_results, :memo, :text
  end
end

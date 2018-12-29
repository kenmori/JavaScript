class AddResultToObjectives < ActiveRecord::Migration[5.2]
  def change
    add_column :objectives, :result, :string
  end
end

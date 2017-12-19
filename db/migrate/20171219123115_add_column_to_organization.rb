class AddColumnToOrganization < ActiveRecord::Migration[5.1]
  def change
    add_column :organizations, :uniq_name, :string, null: false
  end
end

class AddColumnToOrganizations < ActiveRecord::Migration[5.1]
  def change
    add_column :organizations, :logo, :string
  end
end

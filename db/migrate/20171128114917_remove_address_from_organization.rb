class RemoveAddressFromOrganization < ActiveRecord::Migration[5.1]
  def up
    remove_column :organizations, :address
    remove_column :organizations, :postal_code
    remove_column :organizations, :phone_number
  end

  def down
    add_column :organizations, :address, :string
    add_column :organizations, :postal_code, :string
    add_column :organizations, :phone_number, :string
  end
end

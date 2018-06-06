class RemoveUniqNameFromOrganization < ActiveRecord::Migration[5.1]
  def change
    remove_column :organizations, :uniq_name
  end
end

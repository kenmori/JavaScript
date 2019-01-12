class RemoveCurrentOrganizationIdFromUser < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :current_organization_id
  end
end

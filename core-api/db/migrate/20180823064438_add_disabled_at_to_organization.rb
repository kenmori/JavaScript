class AddDisabledAtToOrganization < ActiveRecord::Migration[5.1]
  def change
    add_column :organizations, :disabled_at, :datetime
  end
end

class AddRoleToOrganizationMember < ActiveRecord::Migration[5.1]
  def change
    add_column :organization_members, :role, :integer, default: 1, null: false, limit: 1 # 権限: 代表者 (0), 所属 (1)
  end
end

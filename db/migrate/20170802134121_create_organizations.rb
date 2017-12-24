class CreateOrganizations < ActiveRecord::Migration[5.1]
  def change
    create_table :organizations do |t|
      t.timestamps
      t.string :name, null: false   # 組織名
    end
  end
end

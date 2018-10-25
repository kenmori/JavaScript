class AddDepartments < ActiveRecord::Migration[5.2]
  using LoudApplicationRecord

  def up
    ApplicationRecord.transaction do
      Organization.find_each do |org|
        Department.create!(
          name: '代表',
          display_order: 1,
          organization: org,
          parent: nil
        )
      end
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end

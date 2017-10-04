class ChangeSettingsToOkrSettings < ActiveRecord::Migration[5.1]
  def change
    rename_table :settings, :okr_settings

    remove_foreign_key :okr_settings, :organizations
    remove_index :okr_settings, :organization_id
    remove_reference :okr_settings, :organization
    add_column :okr_settings, :organization_id, :integer, null: false
    add_index :okr_settings, :organization_id

    rename_column :okr_settings, :okr_span, :span
    rename_column :okr_settings, :okr_ready_from, :ready_from
    rename_column :okr_settings, :okr_ready_to, :ready_to
    rename_column :okr_settings, :okr_review_during_from, :review_during_from
    rename_column :okr_settings, :okr_review_during_to, :review_during_to
    rename_column :okr_settings, :okr_review_end_from, :review_end_from
    rename_column :okr_settings, :okr_review_end_to, :review_end_to
  end
end

class RenameUserSettingsColumn < ActiveRecord::Migration[5.1]
  def change
    rename_column :user_settings, :show_my_child_objectives, :show_child_objectives
    rename_column :user_settings, :show_my_key_results, :show_objective_key_results
    rename_column :user_settings, :show_members_key_results, :show_member_key_results
  end
end

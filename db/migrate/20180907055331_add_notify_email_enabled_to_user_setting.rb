class AddNotifyEmailEnabledToUserSetting < ActiveRecord::Migration[5.1]
  def change
    add_column :user_settings, :notify_remind_email_enabled, :boolean, default: true, null: false
  end
end

class AddSlackAccessTokenToOrganization < ActiveRecord::Migration[5.2]
  def change
    add_column :organizations, :slack_access_token, :string
    add_column :organizations, :slack_bot_access_token, :string
    add_column :organizations, :slack_channel, :string
  end
end

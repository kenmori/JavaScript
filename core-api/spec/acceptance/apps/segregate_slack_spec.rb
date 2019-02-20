# frozen_string_literal: true

require "rspec_api_documentation/dsl"
Rails.root.join("spec/acceptance/concerns").each_child { |path| require_dependency(path) }

RSpec.resource "apps", warden: true do
  include RequestHeaderJson
  include OrganizationDataset

  before do
    login_as(admin_user)

    # Slackクライアントのモックが提供されていないので差し替える
    slack_client = double("slack_client")
    allow(slack_client).to receive(:apps_uninstall)
    allow(SlackClientFactory).to receive(:create_web_client).and_return(slack_client)
  end

  delete "/apps/slack" do
    example "SUCCESS: Segregate to Slack" do
      explanation "Slack連携を解除する"

      do_request
      expect(response_status).to eq(204)
    end

    example "ERROR: Non-administrator can not segregate to Slack" do
      explanation "管理者以外はSlack連携解除が行えない"

      login_as(nomal_user)
      do_request
      expect(response_status).to eq(403)
    end
  end
end

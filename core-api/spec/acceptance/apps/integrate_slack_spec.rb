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
    allow(slack_client).to receive(:oauth_access).and_return(
      "bot" => {
        "bot_access_token" => "test"
      },
      "incoming_webhook" => {
        "channel" => "test"
      }
    )
    allow(SlackClientFactory).to receive(:create_web_client).and_return(slack_client)
  end

  put "/apps/slack" do
    parameter :code, "Slackから発行された一時code", type: :string, required: true

    example "SUCCESS: Integrate to Slack" do
      explanation "Slack連携を行う"

      do_request(code: "test")
      expect(response_status).to eq(204)
    end

    example "ERROR: Non-administrator can not integrate to Slack" do
      explanation "管理者以外はSlack連携が行えない"

      login_as(nomal_user)
      do_request(code: "test")
      expect(response_status).to eq(403)
    end
  end
end

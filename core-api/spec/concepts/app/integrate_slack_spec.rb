# frozen_string_literal: true

RSpec.describe App::IntegrateSlack do
  include OrganizationDataset

  example "SUCCESS: Slack連携を行いDBにアクセストークンが保存される" do
    slack_client = double("slack_client")
    allow(slack_client).to receive(:oauth_access).and_return(
      "bot" => {
        "bot_access_token" => "orewa_access_token"
      },
      "incoming_webhook" => {
        "channel" => "#歌でもひとつ歌いたいようなイイ気分だ〜"
      }
    )
    allow(SlackClientFactory).to receive(:create_web_client).and_return(slack_client)

    result = described_class.call(params: { organization_id: organization.id, code: "test" }, current_user: admin_user)

    expect(result).to be_success
    organization.reload
    expect(organization.slack_access_token).to eq("orewa_access_token")
    expect(organization.slack_channel).to eq("#歌でもひとつ歌いたいようなイイ気分だ〜")
  end

  example "ERROR: Slackとの通信エラー" do
    slack_client = double("slack_client")
    allow(slack_client).to receive(:oauth_access).and_raise(Slack::Web::Api::Error.new("slack error"))
    allow(SlackClientFactory).to receive(:create_web_client).and_return(slack_client)

    expect { described_class.call(params: { organization_id: organization.id, code: "test" }, current_user: admin_user) }.to raise_error(ConceptInputError)
  end
end

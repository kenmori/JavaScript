# frozen_string_literal: true

RSpec.describe App::SegregateSlack do
  include OrganizationDataset

  example "SUCCESS: Slack連携を解除しDBからトークンを削除する" do
    slack_client = double("slack_client")
    allow(slack_client).to receive(:auth_test)
    allow(slack_client).to receive(:apps_uninstall)
    allow(SlackClientFactory).to receive(:create_web_client).and_return(slack_client)

    result = described_class.call(params: { organization_id: organization.id }, current_user: admin_user)

    expect(result).to be_success
    organization.reload
    expect(organization.slack_access_token).to eq nil
    expect(organization.slack_channel).to eq nil
  end

  example "ERROR: Slackとの通信エラー" do
    slack_client = double("slack_client")
    allow(slack_client).to receive(:auth_test)
    allow(slack_client).to receive(:apps_uninstall).and_raise(Slack::Web::Api::Error.new("slack error"))
    allow(SlackClientFactory).to receive(:create_web_client).and_return(slack_client)

    expect { described_class.call(params: { organization_id: organization.id }, current_user: admin_user) }.to raise_error(ConceptInputError)
  end
end

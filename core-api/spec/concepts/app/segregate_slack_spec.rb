# frozen_string_literal: true

RSpec.describe App::SegregateSlack do
  include OrganizationDataset

  example "SUCCESS: DBからトークンを削除する" do
    result = described_class.call(params: { organization_id: organization.id }, current_user: admin_user)

    expect(result).to be_success
    organization.reload
    expect(organization.slack_access_token).to eq nil
    expect(organization.slack_channel).to eq nil
  end
end

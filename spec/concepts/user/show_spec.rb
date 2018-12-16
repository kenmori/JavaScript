# frozen_string_literal: true

RSpec.describe User::Show do
  include OrganizationDataset

  example "SUCCESS: ユーザオブジェクトを取得できる" do
    result = described_class.call(params: { id: nomal_user.id, organization_id: organization.id }, current_user: admin_user)
    actual_model = result[:model]

    expect(result).to be_success
    expect(nomal_user.attributes).to eq(actual_model.attributes)
  end

  example "ERROR: 部署とユーザIDの組み合わせが存在しない" do
    result = described_class.call(params: { id: other_org_user.id, organization_id: other_org.id }, current_user: admin_user)

    expect(result).to be_failure
    expect(result["result.policy.default"]).to be_failure
  end
end

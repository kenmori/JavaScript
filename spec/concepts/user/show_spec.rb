# frozen_string_literal: true

RSpec.describe User::Show do
  let(:organization) { OrganizationFactory.new.create }
  let(:user) { UserFactory.new(organization: organization).create }

  example "SUCCESS: ユーザオブジェクトを取得できる" do
    result = described_class.call(params: { id: user.id, organization_id: organization.id })
    actual_model = result[:model]

    expect(result).to be_success
    expect(user.attributes).to eq(actual_model.attributes)
  end

  example "ERROR: 部署とユーザIDの組み合わせが存在しない" do
    result = described_class.call(params: { id: user.id, organization_id: 0 })
    contract = result["contract.default"]

    expect(result).to be_failure
    expect(contract.errors.full_messages).to include(
      "Idは見つかりませんでした"
    )
  end

  example "ERROR: 存在しないユーザID" do
    result = described_class.call(params: { id: 0, organization_id: organization.id })
    contract = result["contract.default"]

    expect(result).to be_failure
    expect(contract.errors.full_messages).to include(
      "Idは見つかりませんでした"
    )
  end
end

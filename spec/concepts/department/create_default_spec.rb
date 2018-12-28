RSpec.describe Department::CreateDefault do
  include OrganizationDataset

  before do
    organization
    admin_user
  end

  example "SUCCESS: create default department" do
    params = {
      organization_id: organization.id,
      owner_id: admin_user.id
    }

    result = described_class.call(params: params, current_user: admin_user)
    department = result[:model]

    expect(department.attributes).to include(
      "id" => a_kind_of(Integer),
      "ancestry" => nil,
      "organization_id" => organization.id,
      "soft_destroyed_at" => nil,
      "name" => "代表",
      "display_order" => 1,
      "created_at" => a_kind_of(Time),
      "updated_at" => a_kind_of(Time),
      "kind" => "first_root"
    )
    expect(organization.departments.count).to eq(1)
  end

  example "ERROR: 必須項目を入力しない" do
    params = {
      organization_id: nil,
      owner_id: nil
    }

    result = described_class.call(params: params, current_user: admin_user)
    contract = result["contract.default"]

    expect(result).to be_failure
    expect(contract.errors.full_messages).to include(
      "組織を入力してください",
      "部署責任者を入力してください"
    )
  end

  example "ERROR: 別の組織のユーザーを指定することは出来ない" do
    params = {
      organization_id: organization.id,
      owner_id: other_org_user.id
    }

    result = described_class.call(params: params, current_user: admin_user)
    contract = result["contract.default"]

    expect(result).to be_failure
    expect(contract.errors.full_messages).to eq(["部署責任者は組織内から選択してください"])
  end
end

# frozen_string_literal: true

RSpec.describe Department::Create do
  let!(:organization) { OrganizationFactory.new.create }
  let!(:admin_user) { UserFactory.new(organization: organization).create(admin: true) }

  example "SUCCESS: ルート部署を作成するケース" do
    params = {
      name: "開発部",
      display_order: 1,
      organization_id: organization.id,
      parent_department_id: nil,
      owner_id: admin_user.id
    }

    result = described_class.call(params: params)
    department = result[:model]

    expect(result).to be_success
    expect(department.name).to eq("開発部")
    expect(department.display_order).to eq(1)
    expect(department.organization).to eq(organization)
    expect(department.parent).to be_nil
    expect(department.owner).to eq(admin_user)
  end

  example "SUCCESS: 子部署を作成するケース" do
    parent_department = Department.create_default!(organization: organization)

    params = {
      name: "開発部",
      display_order: 1,
      organization_id: organization.id,
      parent_department_id: parent_department.id,
      owner_id: admin_user.id
    }

    result = described_class.call(params: params)
    department = result[:model]

    expect(result).to be_success
    expect(department.name).to eq("開発部")
    expect(department.parent).to eq(parent_department)
  end

  example "ERROR: 必須項目を入力しないケース" do
    params = {
      name: nil,
      display_order: nil,
      organization_id: nil,
      parent_department_id: nil,
      owner_id: nil
    }

    result = described_class.call(params: params)
    contract = result["contract.default"]

    expect(result).to be_failure
    expect(contract.errors.full_messages).to include(
      "組織を入力してください",
      "表示順を入力してください",
      "部署名を入力してください",
      "部署責任者を入力してください"
    )
  end

  example "ERROR: 部署名が40文字を超過するケース" do
    params = {
      name: "a" * 41,
      display_order: 1,
      organization_id: organization.id,
      parent_department_id: nil,
      owner_id: admin_user.id
    }

    result = described_class.call(params: params)
    contract = result["contract.default"]

    expect(result).to be_failure
    expect(contract.errors.full_messages).to contain_exactly(
      "部署名は40文字以内で入力してください"
    )
  end

  example "ERROR: owner_idのOrganizationと指定したorganizatio_idが異なるケース" do
    other_org = OrganizationFactory.new.create(name: "other")
    other_org_user = UserFactory.new(organization: other_org).create(
      email: "other_org_user@example.com",
      admin: true
    )

    params = {
      name: "開発部",
      display_order: 1,
      organization_id: organization.id,
      parent_department_id: nil,
      owner_id: other_org_user.id
    }

    result = described_class.call(params: params)
    contract = result["contract.default"]

    expect(result).to be_failure
    expect(contract.errors.full_messages).to contain_exactly(
      "部署責任者は組織内から選択してください"
    )
  end

  example "ERROR: 親部署のOrganizationと指定したorganizatio_idが異なるケース" do
    other_org = OrganizationFactory.new.create(name: "other")
    other_org_department = Department.create_default!(organization: other_org)

    params = {
      name: "開発部",
      display_order: 1,
      organization_id: organization.id,
      parent_department_id: other_org_department.id,
      owner_id: admin_user.id
    }

    result = described_class.call(params: params)
    contract = result["contract.default"]

    expect(result).to be_failure
    expect(contract.errors.full_messages).to contain_exactly(
      "親部署は組織内から選択してください"
    )
  end

  example "ERROR: 指定したIDが見つからないケース" do
    params = {
      name: "開発部",
      display_order: 1,
      organization_id: 0,
      parent_department_id: 0,
      owner_id: 0
    }

    result = described_class.call(params: params)
    contract = result["contract.default"]

    expect(result).to be_failure
    expect(contract.errors.full_messages).to include(
      "組織は見つかりませんでした",
      "部署責任者は見つかりませんでした",
      "親部署は見つかりませんでした"
    )
  end
end

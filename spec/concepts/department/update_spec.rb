# frozen_string_literal: true

RSpec.describe Department::Update do
  let!(:organization) { OrganizationFactory.new.create }
  let!(:admin_user) { UserFactory.new(organization: organization).create(admin: true) }
  let!(:department) {
    DepartmentFactory.new(
      organization: organization,
      owner: admin_user
    ).create
  }

  describe "SUCCESS" do
    let!(:other_department) {
      DepartmentFactory.new(
        organization: organization,
        owner: admin_user
      ).create(
        name: "開発部",
        display_order: 2
      )
    }
    let!(:child_department) {
      DepartmentFactory.new(
        organization: organization,
        owner: admin_user,
        parent_department: department
      ).create(
        name: "Web開発部",
        display_order: 1
      )
    }
    let(:nomal_user) do
      UserFactory.new(organization: organization).create(
        email: "nomal_user@example.com",
        first_name: "普通",
        last_name: "たろう"
      )
    end

    example "部署名を変更する" do
      params = {
        id: child_department.id,
        organization_id: organization.id,
        name: "Ruby部",
      }

      result = described_class.call(params: params)

      child_department.reload
      expect(result).to be_success
      expect(child_department.name).to eq("Ruby部")
    end

    example "表示順を変更する" do
      params = {
        id: child_department.id,
        organization_id: organization.id,
        display_order: 2,
      }

      result = described_class.call(params: params)

      child_department.reload
      expect(result).to be_success
      expect(child_department.display_order).to eq(2)
    end

    example "親部署を変更する" do
      params = {
        id: child_department.id,
        organization_id: organization.id,
        parent_department_id: department.id,
      }

      result = described_class.call(params: params)

      child_department.reload
      expect(result).to be_success
      expect(child_department.parent).to eq(department)
    end

    example "部署責任者を変更する" do
      params = {
        id: child_department.id,
        organization_id: organization.id,
        owner: {
          id: nomal_user.id,
          behavior: "change"
        }
      }

      result = described_class.call(params: params)

      child_department.reload
      expect(result).to be_success
      expect(child_department.owner).to eq(nomal_user)
    end

    example "部署責任者を削除する" do
      params = {
        id: child_department.id,
        organization_id: organization.id,
        owner: {
          id: nil,
          behavior: "remove"
        }
      }

      result = described_class.call(params: params)

      child_department.reload
      expect(result).to be_success
      expect(child_department.owner).to be_nil
    end

    example "全ての項目を変更する" do
      params = {
        id: child_department.id,
        organization_id: organization.id,
        name: "Ruby部",
        display_order: 2,
        parent_department_id: department.id,
        owner: {
          id: nomal_user.id,
          behavior: "change"
        }
      }

      result = described_class.call(params: params)

      child_department.reload
      expect(result).to be_success
      expect(child_department.name).to eq("Ruby部")
      expect(child_department.display_order).to eq(2)
      expect(child_department.organization).to eq(organization)
      expect(child_department.parent).to eq(department)
      expect(child_department.owner).to eq(nomal_user)
    end
  end

  example "ERROR: 必須項目を消すことは出来ない" do
    params = {
      id: department.id,
      organization_id: nil,
      name: "",
      display_order: nil
    }

    result = described_class.call(params: params)
    contract = result["contract.default"]

    expect(result).to be_failure
    expect(contract.errors.full_messages).to contain_exactly(
      "組織を入力してください",
      "表示順を入力してください",
      "部署名を入力してください"
    )
  end
end

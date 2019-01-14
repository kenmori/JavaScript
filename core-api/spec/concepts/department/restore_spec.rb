# frozen_string_literal: true

RSpec.describe Department::Restore do
  using DepartmentHelper
  include DepartmentDataset

  let(:params) do
    {
      id: department.id
    }
  end

  before do
    [dep_1_1, dep_1].each do |d|
      d.archive!(admin_user)
    end
  end

  example "SUUCESS: アーカイブ済みの部署をリストアする" do
    params = {
      id: dep_1.id
    }
    result = described_class.call(params: params, current_user: admin_user)

    dep_1.reload
    expect(result).to be_success
    expect(dep_1).to be_active
  end

  example "ERROR: 親部署がアーカイブ済みの場合リストアできない" do
    params = {
      id: dep_1_1.id
    }
    result = described_class.call(params: params, current_user: admin_user)
    contract = result["contract.default"]

    expect(result).to be_failure
    expect(contract.errors.full_messages).to include(
      "親部署がアーカイブされているためリストアできません"
    )
  end

  context "他の組織の部署が存在する場合" do
    let!(:other_org) { OrganizationFactory.new.create(name: "other") }
    let!(:other_org_user) do
      UserFactory.new(organization: other_org).create(
        last_name: "花京院",
        first_name: "典明",
        email: "other_org_user@example.com",
        admin: true
      )
    end
    let!(:other_org_department) do
      DepartmentFactory.new(organization: other_org, owner: other_org_user).create(
        name: "企画部",
        display_order: 1
      )
    end

    example "ERROR: 他の組織の部署を指定することは出来ない" do
      params = {
        id: other_org_department.id
      }
      result = described_class.call(params: params, current_user: admin_user)

      expect(result).to be_failure
      expect(result["result.policy.default"]).to be_failure
    end
  end
end
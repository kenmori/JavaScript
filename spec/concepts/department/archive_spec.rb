# frozen_string_literal: true

RSpec.describe Department::Archive do
  include DepartmentDataset
  using DepartmentHelper

  before do
    dep_1
    dep_1.department_members.destroy_all
  end

  let(:params) do
    {
      id: dep_1.id
    }
  end

  example "SUCCESS: 部署をアーカイブする" do
    result = described_class.call(params: params, current_user: admin_user)

    dep_1.reload
    expect(result).to be_success
    expect(dep_1).to be_soft_destroyed
  end

  example "SUCCESS: 部署に紐付くOKRが存在する場合でもアーカイブできる" do
    DepartmentObjectiveFactory.new(
      department: dep_1,
      objective: objective
    ).create

    result = described_class.call(params: params, current_user: admin_user)

    dep_1.reload
    expect(result).to be_success
    expect(dep_1).to be_soft_destroyed
  end

  example "SUCCESS: アーカイブ済みの下位部署しか存在しない場合はアーカイブできる" do
    dep_1_1.archive!(admin_user)

    result = described_class.call(params: params, current_user: admin_user)
    department = result[:model]

    expect(result).to be_success
    expect(department).to be_soft_destroyed
  end

  example "ERROR: アーカイブ済みではない下位部署が存在する場合、アーカイブできない" do
    dep_1_1

    result = described_class.call(params: params, current_user: admin_user)
    contract = result["contract.default"]

    expect(result).to be_failure
    expect(contract.errors.full_messages).to include(
      "下位部署が存在するのでアーカイブ出来ません"
    )
  end

  example "ERROR: 部署にユーザーが所属している場合アーカイブできない" do
    user = UserFactory.new(organization: organization).create(
      email: "other_user@example.com"
    )
    DepartmentMemberFactory.new(
      department: dep_1,
      user: user
    ).create

    result = described_class.call(params: params, current_user: admin_user)
    contract = result["contract.default"]

    expect(result).to be_failure
    expect(contract.errors.full_messages).to include(
      "ユーザが所属しているのでアーカイブ出来ません"
    )
  end

  context "他の組織の部署が存在する場合" do
    before do
      other_org
      other_org_user
      dep_2
    end

    example "ERROR: 別の組織の部署をアーカイブすることは出来ない" do
      params = {
        id: dep_2.id
      }
      result = described_class.call(params: params, current_user: admin_user)

      expect(result).to be_failure
      expect(result["result.policy.default"]).to be_failure
    end
  end
end

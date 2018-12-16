# frozen_string_literal: true

RSpec.describe Department::Update do
  include DepartmentDataset
  using DepartmentHelper

  before do
    dep_1_1
  end

  describe "SUCCESS" do
    before do
      dep_1_2
      dep_1_1_1
    end

    example "部署名を変更する" do
      params = {
        id: dep_1_1_1.id,
        organization_id: organization.id,
        name: "Ruby部"
      }

      result = described_class.call(params: params, current_user: admin_user)

      dep_1_1_1.reload
      expect(result).to be_success
      expect(dep_1_1_1.name).to eq("Ruby部")
    end

    example "表示順を変更する" do
      params = {
        id: dep_1_1_1.id,
        organization_id: organization.id,
        display_order: 2
      }

      result = described_class.call(params: params, current_user: admin_user)

      dep_1_1_1.reload
      expect(result).to be_success
      expect(dep_1_1_1.display_order).to eq(2)
    end

    example "親部署を変更する" do
      params = {
        id: dep_1_1_1.id,
        organization_id: organization.id,
        parent_department_id: dep_1_2.id
      }

      result = described_class.call(params: params, current_user: admin_user)

      dep_1_1_1.reload
      expect(result).to be_success
      expect(dep_1_1_1.parent).to eq(dep_1_2)
    end

    example "部署責任者を変更する" do
      params = {
        id: dep_1_1_1.id,
        organization_id: organization.id,
        owner_id: nomal_user.id
      }

      result = described_class.call(params: params, current_user: admin_user)

      dep_1_1_1.reload
      expect(result).to be_success
      expect(dep_1_1_1.owner).to eq(nomal_user)
    end

    example "部署責任者を削除する" do
      params = {
        id: dep_1_1_1.id,
        organization_id: organization.id,
        owner_id: 0
      }

      result = described_class.call(params: params, current_user: admin_user)

      dep_1_1_1.reload
      expect(result).to be_success
      expect(dep_1_1_1.owner).to be_nil
    end

    example "全ての項目を変更する" do
      params = {
        id: dep_1_1_1.id,
        organization_id: organization.id,
        name: "Ruby部",
        display_order: 2,
        parent_department_id: dep_1_2.id,
        owner_id: nomal_user.id
      }

      result = described_class.call(params: params, current_user: admin_user)

      dep_1_1_1.reload
      expect(result).to be_success
      expect(dep_1_1_1.name).to eq("Ruby部")
      expect(dep_1_1_1.display_order).to eq(2)
      expect(dep_1_1_1.organization).to eq(organization)
      expect(dep_1_1_1.parent).to eq(dep_1_2)
      expect(dep_1_1_1.owner).to eq(nomal_user)
    end

    example "部署責任者を削除済みの部署に部署責任者を設定する" do
      dep_1_1_1.department_members_owner.destroy!

      params = {
        id: dep_1_1_1.id,
        organization_id: organization.id,
        owner_id: nomal_user.id
      }

      result = described_class.call(params: params, current_user: admin_user)

      dep_1_1_1.reload
      expect(result).to be_success
      expect(dep_1_1_1.owner).to eq(nomal_user)
    end
  end

  example "ERROR: 必須項目を消すことは出来ない" do
    params = {
      id: dep_1_1.id,
      organization_id: nil,
      name: "",
      display_order: nil
    }

    result = described_class.call(params: params, current_user: admin_user)
    contract = result["contract.default"]

    expect(result).to be_failure
    expect(contract.errors.full_messages).to contain_exactly(
      "組織を入力してください",
      "表示順を入力してください",
      "部署名を入力してください"
    )
  end

  example "ERROR: アーカイブされた部署を親部署に指定することは出来ない" do
    archived_department = DepartmentFactory.new(
      organization: organization,
      owner: admin_user
    ).create_archived(
      name: "開発部",
      display_order: 2
    )

    params = {
      id: dep_1_1.id,
      organization_id: organization.id,
      parent_department_id: archived_department.id
    }

    result = described_class.call(params: params, current_user: admin_user)
    contract = result["contract.default"]

    expect(result).to be_failure
    expect(contract.errors.full_messages).to contain_exactly(
      "親部署はアーカイブ済みです"
    )
  end

  example "ERROR: アーカイブ済みの部署は更新できない" do
    dep_1_1.archive!(admin_user)

    params = {
      id: dep_1_1.id,
      organization_id: organization.id,
      name: "Ruby部"
    }

    result = described_class.call(params: params, current_user: admin_user)
    contract = result["contract.default"]

    expect(result).to be_failure
    expect(contract.errors.full_messages).to contain_exactly(
      "アーカイブ済みのため更新できません"
    )
  end

  example "ERROR: 自分自身を親部署に指定することは出来ない" do
    params = {
      id: dep_1_1.id,
      organization_id: organization.id,
      parent_department_id: dep_1_1.id
    }

    result = described_class.call(params: params, current_user: admin_user)
    contract = result["contract.default"]

    expect(result).to be_failure
    expect(contract.errors.full_messages).to contain_exactly(
      "親部署は別の部署にしてください"
    )
  end

  example "ERROR: 子孫の部署を親部署に指定することは出来ない" do
    dep_1_1_1 = DepartmentFactory.new(
      organization: organization,
      owner: admin_user,
      parent_department: dep_1_1
    ).create(
      name: "Web開発部",
      display_order: 1
    )
    grandchild_department = DepartmentFactory.new(
      organization: organization,
      owner: admin_user,
      parent_department: dep_1_1_1
    ).create(
      name: "Ruby部",
      display_order: 1
    )

    params = {
      id: dep_1_1.id,
      organization_id: organization.id,
      parent_department_id: grandchild_department.id
    }

    result = described_class.call(params: params, current_user: admin_user)
    contract = result["contract.default"]

    expect(result).to be_failure
    expect(contract.errors.full_messages).to contain_exactly(
      "親部署に子孫の部署を指定することは出来ません"
    )
  end

  context "他の組織が存在する" do
    before do
      other_org
      other_org_user
      dep_2
    end

    example "ERROR: organization_idで指定した組織に属していない部署を更新することは出来ない" do
      params = {
        id: dep_1_1.id,
        organization_id: other_org.id,
        name: "Ruby部"
      }

      result = described_class.call(params: params, current_user: admin_user)
      contract = result["contract.default"]

      expect(result).to be_failure
      expect(contract.errors.full_messages).to contain_exactly(
        "部署IDは組織内から選択してください"
      )
    end

    example "ERROR: 異なる組織の部署を親部署に指定することは出来ない" do
      params = {
        id: dep_1_1.id,
        organization_id: organization.id,
        parent_department_id: dep_2.id
      }

      result = described_class.call(params: params, current_user: admin_user)
      contract = result["contract.default"]

      expect(result).to be_failure
      expect(contract.errors.full_messages).to contain_exactly(
        "親部署は組織内から選択してください"
      )
    end

    example "ERROR: 異なる組織のユーザーを部署責任者に指定することは出来ない" do
      params = {
        id: dep_1_1.id,
        organization_id: organization.id,
        owner_id: other_org_user.id
      }

      result = described_class.call(params: params, current_user: admin_user)
      contract = result["contract.default"]

      expect(result).to be_failure
      expect(contract.errors.full_messages).to contain_exactly(
        "部署責任者は組織内から選択してください"
      )
    end
  end
end

# frozen_string_literal: true

module DepartmentDataset
  extend ActiveSupport::Concern

  included do
    include OrganizationDataset

    # organizationの部署
    let!(:dep_1) do
      DepartmentFactory.new(organization: organization, owner: admin_user).create(
        name: "代表",
        display_order: 1
      )
    end
    let!(:dep_1_1) do
      DepartmentFactory.new(organization: organization, owner: admin_user, parent_department: dep_1).create(
        name: "開発部",
        display_order: 1
      )
    end
    let!(:dep_1_1_1) do
      DepartmentFactory.new(organization: organization, owner: admin_user, parent_department: dep_1_1).create(
        name: "金融部",
        display_order: 1
      )
    end
    let!(:dep_1_1_2) do
      DepartmentFactory.new(organization: organization, owner: admin_user, parent_department: dep_1_1).create(
        name: "Web部",
        display_order: 2
      )
    end
    let!(:dep_1_2) do
      DepartmentFactory.new(organization: organization, owner: admin_user, parent_department: dep_1).create(
        name: "営業部",
        display_order: 2
      )
    end
    let!(:dep_1_2_1) do
      DepartmentFactory.new(organization: organization, owner: admin_user, parent_department: dep_1_2).create(
        name: "クラサポ部",
        display_order: 1
      )
    end
    let!(:dep_1_2_2) do
      DepartmentFactory.new(organization: organization, owner: admin_user, parent_department: dep_1_2).create(
        name: "販売部",
        display_order: 2
      )
    end
    let!(:dep_1_3) do
      DepartmentFactory.new(organization: organization, owner: admin_user, parent_department: dep_1).create(
        name: "経理部",
        display_order: 3
      )
    end

    # other_org の部署
    let!(:dep_2) do
      DepartmentFactory.new(organization: other_org, owner: other_org_user).create(
        name: "企画部",
        display_order: 1
      )
    end
    let!(:dep_2_1) do
      DepartmentFactory.new(organization: other_org, owner: other_org_user, parent_department: dep_2).create(
        name: "情報課",
        display_order: 1
      )
    end
    let!(:dep_2_2) do
      DepartmentFactory.new(organization: other_org, owner: other_org_user, parent_department: dep_2).create(
        name: "促進課",
        display_order: 2
      )
    end
  end
end

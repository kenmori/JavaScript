# frozen_string_literal: true

RSpec.describe Department, type: :model do
  describe "associations" do
    let!(:organization) { OrganizationFactory.new.create }
    let!(:admin_user) { UserFactory.new(organization: organization).create(admin: true) }
    let!(:member_user_1) do
      UserFactory.new(organization: organization).create(
        email: "member_user_1@example.com",
        admin: false
      )
    end
    let!(:member_user_2) do
      UserFactory.new(organization: organization).create(
        email: "member_user_2@example.com",
        admin: false
      )
    end
    let!(:department) {
      DepartmentFactory.new(
        organization: organization,
        owner: admin_user
      ).create
    }

    before do
      DepartmentMemberFactory.new(department: department, user: member_user_1).create
      DepartmentMemberFactory.new(department: department, user: member_user_2).create
      department.reload
    end

    example "#users" do
      expect(department.users).to contain_exactly(admin_user, member_user_1, member_user_2)
    end

    example "#owner" do
      expect(department.owner).to eq(admin_user)
    end

    example "#member" do
      expect(department.members).to contain_exactly(member_user_1, member_user_2)
    end
  end

  describe "validation" do
    example "required" do
      department = Department.new(
        name: nil,
        display_order: nil,
        organization_id: nil
      )

      expect(department).not_to be_valid
      expect(department.errors.full_messages).to include(
        "部署名を入力してください",
        "表示順を入力してください",
        "組織を入力してください"
      )
    end

    example "部署名は最大40文字" do
      department = Department.new(name: "a" * 41)

      expect(department).not_to be_valid
      expect(department.errors.full_messages).to include(
        "部署名は40文字以内で入力してください"
      )
    end

    example "organization_idが見つかること" do
      department = Department.new(organization_id: 0)

      expect(department).not_to be_valid
      expect(department.errors.full_messages).to include(
        "組織は見つかりませんでした。"
      )
    end
  end

  describe ".create_default!" do
    let!(:organization) { OrganizationFactory.new.create }

    example "create default department" do
      default_department = Department.create_default!(organization: organization)

      expect(default_department.organization).to eq(organization)
      expect(default_department.name).to eq("代表")
      expect(default_department.display_order).to eq(1)
      expect(default_department).to be_root
    end
  end
end

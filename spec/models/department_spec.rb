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
    let!(:department_fc) { DepartmentFactory.new(organization: organization) }
    let!(:department) { department_fc.create }

    before do
      department_fc.add_user(user: admin_user, role: :owner)
      department_fc.add_user(user: member_user_1, role: :member)
      department_fc.add_user(user: member_user_2, role: :member)
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

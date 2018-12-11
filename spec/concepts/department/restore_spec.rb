RSpec.describe Department::Restore do
  let!(:organization) { OrganizationFactory.new.create }
  let!(:admin_user) { UserFactory.new(organization: organization).create(admin: true) }
  let!(:dep_1) do
    DepartmentFactory.new(
      organization: organization,
      owner: admin_user
    ).create
  end
  let!(:dep_1_1) do
    DepartmentFactory.new(
      organization: organization,
      owner: admin_user,
      parent_department: dep_1
    ).create(
      name: "開発部"
    )
  end
  let(:params) do
    {
      id: department.id
    }
  end

  before do
    [dep_1_1, dep_1].each do |d|
      DepartmentFactory.archive(d)
    end
  end

  example "SUUCESS: アーカイブ済みの部署をリストアする" do
    params = {
      id: dep_1.id
    }
    result = described_class.call(params: params)

    dep_1.reload
    expect(result).to be_success
    expect(dep_1).to be_active
  end

  example "ERROR: 親部署がアーカイブ済みの場合リストアできない" do
    params = {
      id: dep_1_1.id
    }
    result = described_class.call(params: params)
    contract = result["contract.default"]

    expect(result).to be_failure
    expect(contract.errors.full_messages).to include(
      "親部署がアーカイブされているためリストアできません"
    )
  end
end

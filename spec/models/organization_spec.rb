RSpec.describe Organization, type: :model do
  example "after_createで部署を作成する" do
    org = Organization.create(name: "TEST")

    expect(org.departments.count).to eq(1)

    department = org.departments.first
    expect(department.name).to eq(Settings.config.department.default_name)
  end
end

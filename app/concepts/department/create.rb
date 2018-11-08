class Department::Create < Trailblazer::Operation
  class Form < Reform::Form
    property :name
    property :display_order
    property :organization_id
    property :owner_id, virtual: true
    property :parent_department_id, virtual: true

    include DepartmentValidation.new(:default, :create)
  end

  step Model(Department, :new)
  step Contract::Build(constant: Form)
  step Contract::Validate()
  step Contract::Persist(method: :sync)
  step :save_attributes

  def save_attributes(options, metadata)
    department = options[:model]

    ApplicationRecord.transaction do
      if options[:params][:parent_department_id]
        department.parent = Department.find(options[:params][:parent_department_id])
      end
      department.save!

      owner = User.find(options[:params][:owner_id])
      department.create_department_members_owner!(user: owner)
    end

    true
  end
end

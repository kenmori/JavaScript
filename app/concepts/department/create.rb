class Department::Create < Trailblazer::Operation
  class Form < Reform::Form
    property :name
    property :display_order
    property :organization_id
    property :owner_id, virtual: true
    property :parent_department_id, virtual: true

    validates :name, VH[:required, :default_text_field]
    validates :display_order, VH[:required]
    validates :organization_id, VH[:required]
    validates :owner_id, VH[:required]
    validate -> {
      unless OrganizationMember.find_by(organization_id: organization_id, user_id: owner_id)
        errors.add(:owner_id, :must_be_same_organization)
      end
    }
    validate -> {
      parent_department = Department.find_by(id: parent_department_id)
      return unless parent_department

      if parent_department.organization_id != organization_id
        errors.add(:parent_department_id, :must_be_same_organization)
      end
    }
    validate VH.existence_of(Organization, :organization_id)
    validate VH.existence_of(User, :owner_id)
    validate VH.existence_of(Department, :parent_department_id)
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

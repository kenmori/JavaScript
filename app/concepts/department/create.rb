class Department::Create < Trailblazer::Operation
  class Form < Reform::Form
    property :name
    property :display_order
    property :organization_id
    property :owner_id, virtual: true
    property :parent_department_id, virtual: true

    validates :name, presence: true, length: {maximum: 40, allow_blank: true}
    validates :display_order, presence: true
    validates :organization_id, presence: true
    validates :owner_id, presence: true
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

    [
      [Organization, :organization_id],
      [User, :owner_id],
      [Department, :parent_department_id]
    ].each do |klass, id_column_name|
      validate -> {
        return if send(id_column_name).blank?

        unless klass.exists?(id: send(id_column_name))
          errors.add(id_column_name, :not_found)
        end
      }
    end
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

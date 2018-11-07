class DepartmentValidation < Module
  CONTEXTS = {
    default: -> (h) {
      validates :name, h.builder(:required, :default_text_field)
      validates :display_order, h.builder(:required)
      validates :organization_id, h.builder(:required)
      validates :owner_id, h.builder(:required)
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

      validate h.existence_of(Organization, :organization_id)
      validate h.existence_of(User, :owner_id)
      validate h.existence_of(Department, :parent_department_id)
    }
  }

  def initialize(*context)
    @context = context
  end

  def included(base)
    lambdas =
      if @context.empty?
        [CONTEXTS[:default]]
      else
        CONTEXTS.values_at(*@context)
      end
    lambdas.each do |schema|
      base.instance_exec(ValidationHelper.instance, &schema)
    end
  end

  class ValidationHelper
    include Singleton

    VALIDATES_ATTRS_DSL = {
      required: {presence: true},
      default_text_field: {length: {maximum: 40, allow_blank: true}},
    }

    def builder(*names)
      params = VALIDATES_ATTRS_DSL.values_at(*names)
      params.each_with_object({}) {|param, result| result.merge!(param) }
    end

    def existence_of(klass, id_column_name)
      -> {
        return if __send__(id_column_name).blank?

        unless klass.exists?(id: __send__(id_column_name))
          errors.add(id_column_name, :not_found)
        end
      }
    end
  end
end


class Department::Create < Trailblazer::Operation
  class Form < Reform::Form
    property :name
    property :display_order
    property :organization_id
    property :owner_id, virtual: true
    property :parent_department_id, virtual: true

    include DepartmentValidation.new

    # include ExistsValidator.new(Organization, :organization_id)
    # include ExistsValidator.new(User, :owner_id)
    # include ExistsValidator.new(Department, :parent_department_id)
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

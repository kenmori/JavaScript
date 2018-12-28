class Department::CreateDefault < Trailblazer::Operation
  class Form < Reform::Form
    property :organization_id, virtual: true
    property :owner_id, virtual: true

    validates :organization_id, presence: true
    validates :owner_id, presence: true
  end

  step Model(Class, :new)
  step Policy::Pundit(DepartmentPolicy, :create?)
  step Contract::Build(constant: Form)
  step Contract::Validate()
  step :create
  failure :raise_error!

  def create(options, model:, params:, **_metadata)
    owner = User.find(params[:owner_id])

    params = {
      name: Settings.config.department.default_name,
      display_order: 1,
      organization_id: params[:organization_id],
      owner_id: owner.id,
      parent_department_id: nil,
      kind: :first_root
    }
    dep_create_result = Department::Create.call(params: params, current_user: owner)

    if dep_create_result.success?
      options[:model] = dep_create_result[:model]
      true
    else
      dep_create_result["contract.default"].errors.each do |key, arr|
        options["contract.default"].errors.add(key, arr)
      end
      false
    end
  end

  def raise_error!(options, **_metadata)
    raise ConceptInputError.new(options["contract.default"].errors.full_messages.join(', '))
  end
end

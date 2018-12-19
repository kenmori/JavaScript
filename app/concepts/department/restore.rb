class Department::Restore < Trailblazer::Operation
  class Form < Reform::Form
    property :id

    validate -> {
      if model.parent&.archived?
        errors.add(:base, :parent_department_must_be_active)
      end
    }
  end

  step Model(Department, :find_by)
  step Policy::Pundit(DepartmentPolicy, :restore?)
  step Contract::Build(constant: Form)
  step Contract::Validate()
  step Contract::Persist(method: :sync)
  step :restore

  def restore(_options, model:, params:, **_metadata)
    model.restore
  end
end

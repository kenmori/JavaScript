# frozen_string_literal: true

class Department::Archive < Trailblazer::Operation
  class Form < Reform::Form
    property :id

    validate -> {
      if model.children.without_soft_destroyed.exists?
        errors.add(:base, :must_not_have_children)
      end
    }
    validate -> {
      errors.add(:base, :members_must_not_belong) if model.users.present?
    }
  end

  step Model(Department, :find_by)
  step Contract::Build(constant: Form)
  step Contract::Validate()
  step Contract::Persist(method: :sync)
  step :archive

  def archive(_options, model:, params:, **_metadata)
    model.soft_destroy
  end
end

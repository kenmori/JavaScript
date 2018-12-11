class Department::Restore < Trailblazer::Operation
  class Form < Reform::Form
    property :id

    # TODO current_user の organization の department id ではない場合エラー(これPunditの方がいいかね...)
    # Controller で current_user.departments みたいなクエリを作らないので、全てConceptでやるほうがいいのかもしれない
    validate -> {
      if model.parent&.archived?
        errors.add(:base, :parent_department_must_be_active)
      end
    }
  end

  # TODO これをどこに定義するか考える
  module PolicyStep
    def self.build(policy_class, query)
      ->(_options, current_user:, model:, **) {
        Pundit.authorize(current_user, model, query, policy_class: policy_class)
      }
    end
  end

  step Model(Department, :find_by)
  step PolicyStep.build(DepartmentPolicy, :restore?)
  step Contract::Build(constant: Form)
  step Contract::Validate()
  step Contract::Persist(method: :sync)
  step :restore

  def restore(_options, model:, params:, **_metadata)
    model.restore
  end
end

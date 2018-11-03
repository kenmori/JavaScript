class Department::Create < Trailblazer::Operation
  class Form < Reform::Form
    property :name
    property :display_order
    property :organization_id  # TODO 面倒だったら別の区分に分ける
    property :parent_department_id, virtual: true
    property :owner_id, virtual: true

    # validates
  end

  step Model(Department, :new)  # options["model"] に model が入る
  step Contract::Build(constant: Form)
  step Contract::Validate()
  # failure  :log_error!
  step Contract::Persist(method: :sync)
  step :perform

  # TODO rename
  def perform(options, metadata)
    pp options
    pp metadata
  end
end

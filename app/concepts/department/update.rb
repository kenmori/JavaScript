# frozen_string_literal: true

class Department::Update < Trailblazer::Operation
  class Form < Reform::Form
    property :id
    property :name
    property :display_order
    property :organization_id
    property :owner_id, virtual: true
    property :parent_department_id, virtual: true
  end

  step Model(Department, :find_by)
  step Contract::Build(constant: Form)
  step Contract::Validate()
  step Contract::Persist(method: :sync)
  step :update_record

  def update_record(_options, model:, params:, **_metadata)
    ApplicationRecord.transaction do
      model.save!
      model.department_members_owner.update!(user_id: params[:owner_id])
    end

    true
  end
end

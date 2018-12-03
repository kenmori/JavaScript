# frozen_string_literal: true

class Department::Update < Trailblazer::Operation
  class Form < Reform::Form
    property :id
    property :organization_id
    property :name
    property :display_order
    property :parent_department_id, virtual: true
    property :owner_id, virtual: true

    include DepartmentValidation.new(:default)

    validates :id, VH[:required, :natural_number]
  end

  step Model(Department, :find_by)
  step Contract::Build(constant: Form)
  step Contract::Validate()
  step Contract::Persist(method: :sync)
  step :update_record

  def update_record(_options, model:, params:, **_metadata)
    ApplicationRecord.transaction do
      if params[:parent_department_id]
        model.parent = Department.find(params[:parent_department_id])
      end
      model.save!

      if params[:owner_id].present?
        model.department_members_owner.update!(user_id: params[:owner_id])
      end
    end

    true
  end
end

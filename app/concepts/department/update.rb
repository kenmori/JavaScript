# frozen_string_literal: true

class Department::Update < Trailblazer::Operation
  class Form < Reform::Form
    property :id
    property :organization_id
    property :name
    property :display_order
    # TODO parent_department_id がアーカイブ済みの場合エラー
    # TODO parent_department_id は同じ組織に所属している必要がある
    property :parent_department_id, virtual: true
    property :owner_id, virtual: true
    property :owner_behavior, virtual: true

    include DepartmentValidation.new(:default, :parent_department_id, :owner_id)
    validates :id, VH[:required, :natural_number]
    validates :owner_behavior, inclusion: { in: %w(change remove), allow_blank: true }
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

      if params[:owner_behavior]
        update_owner!(model, **params.slice(:owner_id, :owner_behavior))
      end
    end

    true
  end

  private

  def update_owner!(department, owner_id:, owner_behavior:)
    case owner_behavior.to_s
    when "change"
      department.department_members_owner.update!(user_id: owner_id)
    when "remove"
      department.department_members_owner.destroy!
    else
      fail ArgumentError.new("unkown owner_behavior: #{owner_behavior}")
    end
  end
end

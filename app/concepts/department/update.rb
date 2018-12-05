# frozen_string_literal: true

class Department::Update < Trailblazer::Operation
  class Form < Reform::Form
    property :id
    property :organization_id
    property :name
    property :display_order
    property :parent_department_id, virtual: true
    property :owner, virtual: true do
      property :id
      property :behavior

      validates :id, VH[:natural_number]
      validates :behavior, inclusion: { in: %w(change remove), allow_blank: true }
    end

    include DepartmentValidation.new(:default)

    validates :id, VH[:required, :natural_number]
  end

  step Model(Department, :find_by)
  step Contract::Build(builder: ->(options, model:, **){
    owner = OpenStruct.new({id: nil, behavior: nil})
    Form.new(model, owner: owner)
  })
  step Contract::Validate()
  step Contract::Persist(method: :sync)
  step :update_record

  def update_record(_options, model:, params:, **_metadata)
    ApplicationRecord.transaction do
      if params[:parent_department_id]
        model.parent = Department.find(params[:parent_department_id])
      end
      model.save!

      if params[:owner]
        update_owner!(model, **params[:owner])
      end
    end

    true
  end

  private

  def update_owner!(department, id:, behavior:)
    case behavior.to_s
    when "change"
      department.department_members_owner.update!(user_id: id)
    when "remove"
      department.department_members_owner.destroy!
    else
      fail ArgumentError.new("unkown behavior: #{behavior}")
    end
  end
end

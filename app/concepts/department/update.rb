# frozen_string_literal: true

class Department::Update < Trailblazer::Operation
  class Form < Reform::Form
    property :id
    property :organization_id
    property :name
    property :display_order
    property :parent_department_id, virtual: true
    property :owner_id, virtual: true
    property :owner_behavior, virtual: true

    include DepartmentValidation.new(:default, :parent_department_id, :owner_id)
    validates :id, VH[:required, :natural_number]
    validate -> {
      if model.archived?
        errors.add(:base, :already_archived)
      end
    }
    validates :parent_department_id, exclusion: {in: ->(form) { [form.id, form.id.to_s] }, message: :must_be_other, allow_blank: true}
    validates :owner_behavior, inclusion: { in: %w(change remove), allow_blank: true }
  end

  step Model(Department, :find_by)
  step Contract::Build(constant: Form)
  step Contract::Validate()
  step Contract::Persist(method: :sync)
  step :check_ancestry_exclude_self
  step :update_record

  private

  # NOTE ancestry_exclude_self により木構造の整合性(子孫を親としていないかどうか)を検証します
  # ancestry_exclude_self が model で使う前提の作りなので validation とは別にしています
  def check_ancestry_exclude_self(options, model:, params:, **_metadata)
    return true unless params[:parent_department_id]

    model.parent_id = params[:parent_department_id]
    model.ancestry_exclude_self
    if model.errors.present?
      options["contract.default"].errors.add(:parent_department_id, :exclusion_self)
      false
    else
      true
    end
  end

  def update_record(_options, model:, params:, **_metadata)
    ApplicationRecord.transaction do
      model.save!

      if params[:owner_behavior]
        update_owner!(model, params[:owner_id], params[:owner_behavior])
      end
    end

    true
  end

  def update_owner!(department, owner_id, owner_behavior)
    case owner_behavior.to_s
    when "change"
      # TODO department_members_owner が nil の可能性がある
      department.department_members_owner.update!(user_id: owner_id)
    when "remove"
      department.department_members_owner.destroy!
    else
      fail ArgumentError.new("unkown owner_behavior: #{owner_behavior}")
    end
  end
end

# frozen_string_literal: true

class Department::Update < Trailblazer::Operation
  class Form < Reform::Form
    property :id, writeable: false
    property :organization_id, writeable: false
    property :name
    property :display_order
    property :parent_department_id, virtual: true
    property :owner_id, virtual: true

    include DepartmentValidation.new(:default, :parent_department_id, :owner_id)

    validates :id, VH[:required, :natural_number]
    validate -> {
      return if id.blank? || organization_id.blank?

      unless Department.exists?(organization_id: organization_id, id: id)
        errors.add(:id, :must_be_same_organization)
      end
    }
    validate -> {
      errors.add(:base, :already_archived) if model.archived?
    }
    validates :parent_department_id, exclusion: { in: ->(form) { [form.id, form.id.to_s] }, message: :must_be_other, allow_blank: true }
  end

  step Model(Department, :find_by)
  step Contract::Build(constant: Form)
  step Contract::Validate()
  step Contract::Persist(method: :sync)
  step :check_ancestry_exclude_self
  step :update

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

    def update(_options, model:, params:, **_metadata)
      ApplicationRecord.transaction do
        model.save!
        update_owner!(model, params[:owner_id])
      end

      true
    end

    def update_owner!(department, owner_id)
      return if owner_id.blank?

      case owner_id.to_s
      when "0"  # 0 の場合は削除
        if department.department_members_owner
          department.department_members_owner.destroy!
        else
          # do nothing
        end
      else # 0 以外は owner_id で更新する
        if department.department_members_owner
          department.department_members_owner.update!(user_id: owner_id)
        else
          department.create_department_members_owner!(user_id: owner_id)
        end
      end
    end
end

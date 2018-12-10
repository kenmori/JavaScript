# frozen_string_literal: true

class DepartmentValidation < ValidationSchema
  setting :default, -> {
    validates :name, VH[:required, :default_text_field]
    validates :display_order, VH[:required]
    validates :organization_id, VH[:required]
    validate VH.existence_of(Organization, :organization_id)
  }
  setting :parent_department_id, -> {
    validates :parent_department_id, VH[:natural_number]
    validate VH.existence_of(Department, :parent_department_id)
    validate -> {
      parent_department = Department.find_by(id: parent_department_id)
      return unless parent_department

      if parent_department.organization_id != organization_id
        errors.add(:parent_department_id, :must_be_same_organization)
      end

      if parent_department.archived?
        errors.add(:parent_department_id, :must_not_be_archive)
      end
    }
  }
  setting :owner_id, -> {
    validates :owner_id, VH[:natural_number]
    validate -> {
      return if owner_id.to_i.zero? # NOTE owner_id に 0 が指定されていた場合は特別扱いする

      unless OrganizationMember.find_by(organization_id: organization_id, user_id: owner_id)
        errors.add(:owner_id, :must_be_same_organization)
      end
    }
  }
  setting :index, -> {
    validates :organization_id, VH[:required]
    validate -> {
      return if ids.blank?

      unless Department.exists?(organization_id: organization_id, id: ids)
        errors.add(:ids, :must_be_same_organization)
      end
    }
  }
end

# frozen_string_literal: true

class UserValidation < ValidationSchema
  setting :default, -> {
    validates :email, VH[:required, :email]
    validates_uniqueness_of :email
    validates :first_name, VH[:required, :middle_text_field]
    validates :last_name, VH[:required, :middle_text_field]
    validates :admin, VH[:boolean]
  }
  setting :department_ids, -> {
    validate -> {
      return if department_ids.nil?

      if department_ids.all?(&:nil?)
        errors.add(:department_ids, :blank)
        return
      end

      departments = Department.where(id: department_ids)
      if departments.any? { |d| d.organization_id != current_user.organization.id }
        errors.add(:department_ids, :must_be_same_organization)
      end
    }
  }
end

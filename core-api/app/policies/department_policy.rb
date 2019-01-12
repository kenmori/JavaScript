# frozen_string_literal: true

class DepartmentPolicy
  include PolicyHelper

  def initialize(current_user, department)
    @current_user = current_user
    @department = department
  end

  def index?
    current_user_admin?
  end

  def create?
    current_user_admin?
  end

  def update?
    current_user_admin? && same_organization?(@department)
  end

  def archive?
    current_user_admin? && same_organization?(@department)
  end

  def restore?
    current_user_admin? && same_organization?(@department)
  end
end

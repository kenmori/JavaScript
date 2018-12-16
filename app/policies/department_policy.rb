# frozen_string_literal: true

class DepartmentPolicy
  def initialize(user, department)
    @user = user
    @department = department
  end

  def index?
    current_user_admin?
  end

  def create?
    current_user_admin?
  end

  def update?
    current_user_admin? && same_organization?
  end

  def archive?
    current_user_admin? && same_organization?
  end

  def restore?
    current_user_admin? && same_organization?
  end

  private

    def current_user_admin?
      @user.admin?
    end

    def same_organization?
      @department.organization == @user.organization
    end
end

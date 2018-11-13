# frozen_string_literal: true

class DepartmentPolicy
  def initialize(user, _)
    @user = user
  end

  def create?
    @user.admin?
  end
end

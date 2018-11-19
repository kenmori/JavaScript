# frozen_string_literal: true

class DepartmentPolicy
  def initialize(user, _)
    @user = user
  end

  def index?
    is_current_user_admin?
  end

  def create?
    is_current_user_admin?
  end

  private

    def is_current_user_admin?
      @user.admin?
    end
end

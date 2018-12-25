class UserPolicy
  def initialize(current_user, target_user)
    @current_user = current_user
    @target_user = target_user
  end

  def create?
    current_user_admin?
  end

  def update?
    (current_user_admin? || myself?) && same_organization?
  end

  private

    # TODO DepartmentPolicy とコードが重複しているので修正したい
    def current_user_admin?
      @current_user.admin?
    end

    def same_organization?
      @current_user.organization == @target_user.organization
    end

    def myself?
      @current_user == @target_user
    end
end

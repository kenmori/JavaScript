class UserPolicy
  def initialize(user, _)
    @user = user
  end

  def create?
    current_user_admin?
  end

  private

    def current_user_admin?
      @user.admin?
    end
end

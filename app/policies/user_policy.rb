class UserPolicy
  def initialize(user, _)
    @user = user
  end

  def create?
    current_user_admin?
  end

  def update?
    current_user_admin?
    # TODO 自分自身の情報は更新できる
    # forbidden and return unless valid_permission?(@user.organization.id)
  end

  private

    def current_user_admin?
      @user.admin?
    end
end

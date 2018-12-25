class UserPolicy
  def initialize(current_user, target_user)
    @current_user = current_user
    @target_user = target_user
  end

  def create?
    current_user_admin?
  end

  def update?
    current_user_admin?
    # TODO 自分自身の情報は更新できる
    # forbidden and return unless valid_permission?(@current_user.organization.id)
  end

  private

    def current_user_admin?
      @current_user.admin?
    end
end

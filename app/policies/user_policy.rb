class UserPolicy
  include PolicyHelper

  def initialize(current_user, target_user)
    @current_user = current_user
    @target_user = target_user
  end

  def create?
    current_user_admin?
  end

  def update?
    (current_user_admin? || myself?) && same_organization?(@target_user)
  end

  private
    def myself?
      @current_user == @target_user
    end
end

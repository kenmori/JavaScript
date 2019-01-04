module PolicyHelper
  def current_user_admin?
    @current_user.admin?
  end

  def same_organization?(target)
    @current_user.organization == target.organization
  end
end

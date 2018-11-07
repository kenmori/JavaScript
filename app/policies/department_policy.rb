class DepartmentPolicy
  def initialize(user, _)
    @user = user
  end

  def create?
    @user.admin?
  end
end

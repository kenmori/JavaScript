require_relative "abstract_factory"

class DepartmentMemberFactory < AbstractFactory
  def initialize(department:, user:)
    super(DepartmentMember.new)
    @department = department
    @user = user
  end
  attr_reader :department, :user

  private

    def default_params
      {
        department_id: department.id,
        user_id: user.id,
        role: :member
      }
    end
end

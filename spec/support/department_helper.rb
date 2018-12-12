module DepartmentHelper
  refine Department do
    def archive!(current_user)
      department_members.destroy_all
      Department::Archive.call(params: { id: id }, current_user: current_user)
      reload
    end
  end
end

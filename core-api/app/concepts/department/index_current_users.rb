# frozen_string_literal: true

class Department::IndexCurrentUsers < Trailblazer::Operation
  step Policy::Pundit(DepartmentPolicy, :current_users?)
  step :query

  def query(options, params:, current_user:, **_metadata)
    options[:query] = current_user.departments.map {|department|
      department.arrange_serializable(order: :display_order) do |parent, children|
        {
          id: parent.id,
          archived: parent.archived?,
          soft_destroyed_at: parent.soft_destroyed_at,
          name: parent.name,
          display_order: parent.display_order,
          created_at: parent.created_at,
          updated_at: parent.updated_at,
          user_count: parent.department_members.size,
          children: children
        }.with_indifferent_access
      end
    }
  end
end

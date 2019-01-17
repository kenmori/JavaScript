# frozen_string_literal: true

class User::Departments < Trailblazer::Operation
  step Model(User, :find_by)
  step Policy::Pundit(UserPolicy, :departments?)
  step :query

  def query(options, model:, **_metadata)
    options[:query] = model.departments.arrange_serializable(order: :display_order) do |parent, children|
      # TODO Department::Index とのコードの重複が気になる。モデルに移動する？
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
  end
end

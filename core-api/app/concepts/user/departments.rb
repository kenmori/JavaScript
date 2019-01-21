# frozen_string_literal: true

class User::Departments < Trailblazer::Operation
  step Model(User, :find_by)
  step Policy::Pundit(UserPolicy, :departments?)
  step :query

  def query(options, model:, **_metadata)
    options[:query] = model.departments.arrange_serializable(order: :display_order) do |parent, children|
      parent.serialize_index(children)
    end
  end
end

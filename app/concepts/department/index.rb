# frozen_string_literal: true

class Department::Index < Trailblazer::Operation
  class Form < Reform::Form
    property :organization_id, virtual: true
    property :ids, virtual: true

    include DepartmentValidation.new(:index)
  end

  step Model(Class, :new)
  step Contract::Build(constant: Form)
  step Contract::Validate()
  step :query

  def query(options, params:, **_metadata)
    roots =
      if params[:ids]
        Department.where(organization_id: params[:organization_id], id: params[:ids])
      else
        Department.where(organization_id: params[:organization_id]).roots
      end

    options[:query] = roots.map do |node|
      node.subtree.includes(:department_members).arrange_serializable(order: :display_order) do |parent, children|
        {
          id: parent.id,
          soft_destroyed_at: parent.soft_destroyed_at,
          name: parent.name,
          display_order: parent.display_order,
          created_at: parent.created_at,
          updated_at: parent.updated_at,
          user_count: parent.department_members.size,
          children: children
        }.with_indifferent_access
      end.first
    end
  end
end

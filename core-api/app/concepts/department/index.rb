# frozen_string_literal: true

class Department::Index < Trailblazer::Operation
  class Form < Reform::Form
    property :organization_id, virtual: true
    property :ids, virtual: true
    property :show_users, virtual: true, default: false
    def show_users
      CastBoolean[super]
    end

    include DepartmentValidation.new(:index)
    validates :show_users, VH[:boolean]
  end

  step Model(Class, :new)
  step Policy::Pundit(DepartmentPolicy, :index?)
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

    options[:query] =
      if params[:show_users]
        department_subtree_with_users(roots)
      else
        department_subtree(roots)
      end
  end

  private

    def department_subtree_with_users(roots)
      roots.map do |node|
        node.subtree.includes(:department_members, :users).arrange_serializable(order: :display_order) do |parent, children|
          parent.serialize_index_with_users(children)
        end.first
      end
    end

    def department_subtree(roots)
      roots.map do |node|
        node.subtree.includes(:department_members).arrange_serializable(order: :display_order) do |parent, children|
          parent.serialize_index(children)
        end.first
      end
    end
end

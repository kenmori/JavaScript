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
        {
          id: parent.id,
          archived: parent.archived?,
          soft_destroyed_at: parent.soft_destroyed_at,
          name: parent.name,
          display_order: parent.display_order,
          created_at: parent.created_at,
          updated_at: parent.updated_at,
          user_count: parent.department_members.size,
          users: parent.users.map {|user|
            {
              id: user.id,
              first_name: user.first_name,
              last_name: user.last_name,
              avatar_url: user.avatar_url,
              disabled: user.disabled,
              sign_in_at: user.sign_in_at,
              email: user.unconfirmed_email || user.email,
              is_confirming: !user.confirmed? || user.unconfirmed_email,
              is_admin: user.admin?
            }
          },
          children: children
        }.with_indifferent_access
      end.first
    end
  end

  def department_subtree(roots)
    roots.map do |node|
      node.subtree.includes(:department_members).arrange_serializable(order: :display_order) do |parent, children|
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
      end.first
    end
  end
end

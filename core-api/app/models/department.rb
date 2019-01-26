# frozen_string_literal: true

# ## Schema Information
#
# Table name: `departments`
#
# ### Columns
#
# Name                     | Type               | Attributes
# ------------------------ | ------------------ | ---------------------------
# **`id`**                 | `bigint(8)`        | `not null, primary key`
# **`ancestry`**           | `string(255)`      |
# **`display_order`**      | `integer`          | `not null`
# **`kind`**               | `integer`          |
# **`name`**               | `string(255)`      | `not null`
# **`soft_destroyed_at`**  | `datetime`         |
# **`created_at`**         | `datetime`         | `not null`
# **`updated_at`**         | `datetime`         | `not null`
# **`organization_id`**    | `bigint(8)`        | `not null`
#

class Department < ApplicationRecord
  has_ancestry
  soft_deletable

  include DepartmentValidation.new

  belongs_to :organization
  has_many :department_members, dependent: :destroy
  has_many :users, through: :department_members
  has_many :department_objectives
  has_many :objectives, through: :department_objectives

  has_one :department_members_owner, -> { where(role: :owner) }, class_name: "DepartmentMember"
  has_one :owner, through: :department_members_owner, class_name: "User", source: :user

  has_many :department_members_members, -> { where(role: :member) }, class_name: "DepartmentMember"
  has_many :members, through: :department_members_members, class_name: "User", source: :user

  enum kind: { first_root: 0, nomal: 1 } # migration で nomal を default にしている

  alias archived? soft_destroyed?

  def active?
    !archived?
  end

  def first_root?
    kind == "first_root"
  end

  # TODO: OPTIMIZE Serialize 関係のメソッドが増えるなら ActiveModel::Serializers の導入を検討する
  def serialize_index(children)
    {
      id: id,
      archived: archived?,
      soft_destroyed_at: soft_destroyed_at,
      name: name,
      display_order: display_order,
      created_at: created_at,
      updated_at: updated_at,
      user_count: department_members.size,
      children: children
    }.with_indifferent_access
  end

  def serialize_index_with_users(children)
    {
      id: id,
      archived: archived?,
      soft_destroyed_at: soft_destroyed_at,
      name: name,
      display_order: display_order,
      created_at: created_at,
      updated_at: updated_at,
      user_count: department_members.size,
      users: users.map do |user|
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
      end,
      children: children
    }.with_indifferent_access
  end
end

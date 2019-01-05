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

  class << self
    def create_default!(organization:)
      Department.create!(
        organization: organization,
        name: Settings.config.department.default_name,
        display_order: 1,
        parent: nil
      )
    end
  end

  alias archived? soft_destroyed?
  def active?
    !archived?
  end
end

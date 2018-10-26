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
# **`name`**               | `string(255)`      | `not null`
# **`soft_destroyed_at`**  | `datetime`         |
# **`created_at`**         | `datetime`         | `not null`
# **`updated_at`**         | `datetime`         | `not null`
# **`organization_id`**    | `bigint(8)`        | `not null`
#

class Department < ApplicationRecord
  has_ancestry
  soft_deletable

  belongs_to :organization
  has_many :department_members, dependent: :destroy
  has_many :users, through: :department_members
  has_many :department_objectives
  has_many :objectives, through: :department_objectives

  class << self
    def create_default!(organization:)
      Department.create!(
        organization: organization,
        name: '代表',
        display_order: 1,
        parent: nil
      )
    end
  end
end

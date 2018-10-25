# ## Schema Information
#
# Table name: `departments`
#
# ### Columns
#
# Name                     | Type               | Attributes
# ------------------------ | ------------------ | ---------------------------
# **`id`**                 | `bigint(8)`        | `not null, primary key`
# **`ancestry`**           | `string(255)`      | `not null`
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
end

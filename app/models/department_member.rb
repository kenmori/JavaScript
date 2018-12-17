# frozen_string_literal: true
# ## Schema Information
#
# Table name: `department_members`
#
# ### Columns
#
# Name                 | Type               | Attributes
# -------------------- | ------------------ | ---------------------------
# **`id`**             | `bigint(8)`        | `not null, primary key`
# **`role`**           | `integer`          | `not null`
# **`created_at`**     | `datetime`         | `not null`
# **`updated_at`**     | `datetime`         | `not null`
# **`department_id`**  | `bigint(8)`        | `not null`
# **`user_id`**        | `bigint(8)`        | `not null`
#

class DepartmentMember < ApplicationRecord
  belongs_to :user
  belongs_to :department

  enum role: { owner: 0, member: 1 }

  validates :role, presence: true
  validates :department_id, presence: true
  validates :user_id, presence: true
end

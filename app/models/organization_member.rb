# frozen_string_literal: true

# ## Schema Information
#
# Table name: `organization_members`
#
# ### Columns
#
# Name                   | Type               | Attributes
# ---------------------- | ------------------ | ---------------------------
# **`id`**               | `bigint(8)`        | `not null, primary key`
# **`role`**             | `integer`          | `default("member"), not null`
# **`created_at`**       | `datetime`         | `not null`
# **`updated_at`**       | `datetime`         | `not null`
# **`organization_id`**  | `integer`          | `not null`
# **`user_id`**          | `integer`          | `not null`
#

class OrganizationMember < ApplicationRecord
  belongs_to :organization
  belongs_to :user

  enum role: { owner: 0, member: 1 }

  before_create do
    self.role = :owner unless organization.organization_members.exists? # 最初のユーザーを代表者にする
  end
end

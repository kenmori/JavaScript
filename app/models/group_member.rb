# frozen_string_literal: true

# ## Schema Information
#
# Table name: `group_members`
#
# ### Columns
#
# Name              | Type               | Attributes
# ----------------- | ------------------ | ---------------------------
# **`id`**          | `bigint(8)`        | `not null, primary key`
# **`role`**        | `integer`          | `default("owner"), not null`
# **`created_at`**  | `datetime`         | `not null`
# **`updated_at`**  | `datetime`         | `not null`
# **`group_id`**    | `integer`          | `not null`
# **`user_id`**     | `integer`          | `not null`
#

class GroupMember < ApplicationRecord
  belongs_to :group
  belongs_to :user

  enum role: { owner: 0, member: 1 }
end

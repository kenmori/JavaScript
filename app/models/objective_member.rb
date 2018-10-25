# frozen_string_literal: true

# ## Schema Information
#
# Table name: `objective_members`
#
# ### Columns
#
# Name                | Type               | Attributes
# ------------------- | ------------------ | ---------------------------
# **`id`**            | `bigint(8)`        | `not null, primary key`
# **`role`**          | `integer`          | `default("owner"), not null`
# **`created_at`**    | `datetime`         | `not null`
# **`updated_at`**    | `datetime`         | `not null`
# **`objective_id`**  | `integer`          | `not null`
# **`user_id`**       | `integer`          | `not null`
#


class ObjectiveMember < ApplicationRecord
  belongs_to :objective
  belongs_to :user

  enum role: { owner: 0, member: 1 }
end

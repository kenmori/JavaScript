# frozen_string_literal: true

# ## Schema Information
#
# Table name: `key_result_members`
#
# ### Columns
#
# Name                 | Type               | Attributes
# -------------------- | ------------------ | ---------------------------
# **`id`**             | `bigint(8)`        | `not null, primary key`
# **`processed`**      | `boolean`          | `default(FALSE), not null`
# **`role`**           | `integer`          | `default("owner"), not null`
# **`created_at`**     | `datetime`         | `not null`
# **`updated_at`**     | `datetime`         | `not null`
# **`key_result_id`**  | `integer`          | `not null`
# **`user_id`**        | `integer`          | `not null`
#


class KeyResultMember < ApplicationRecord
  belongs_to :key_result
  belongs_to :user

  enum role: { owner: 0, member: 1 }

  validates :user_id, uniqueness: { scope: :key_result_id }

  before_create do
    self.processed = user_id == key_result.objective.owner.id unless processed
  end

  after_create do
    NotificationMailer.assign_key_result(Current.user, user, key_result).deliver_later unless processed
  end
end

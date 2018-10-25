# frozen_string_literal: true

# ## Schema Information
#
# Table name: `user_settings`
#
# ### Columns
#
# Name                               | Type               | Attributes
# ---------------------------------- | ------------------ | ---------------------------
# **`id`**                           | `bigint(8)`        | `not null, primary key`
# **`notify_remind_email_enabled`**  | `boolean`          | `default(TRUE), not null`
# **`show_child_objectives`**        | `boolean`          | `default(TRUE)`
# **`show_disabled_okrs`**           | `boolean`          | `default(FALSE), not null`
# **`show_member_key_results`**      | `boolean`          | `default(TRUE)`
# **`show_objective_key_results`**   | `boolean`          | `default(TRUE)`
# **`created_at`**                   | `datetime`         | `not null`
# **`updated_at`**                   | `datetime`         | `not null`
# **`user_id`**                      | `integer`          | `not null`
#


class UserSetting < ApplicationRecord
  belongs_to :user
end

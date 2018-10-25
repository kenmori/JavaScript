# frozen_string_literal: true

# ## Schema Information
#
# Table name: `comments`
#
# ### Columns
#
# Name                               | Type               | Attributes
# ---------------------------------- | ------------------ | ---------------------------
# **`id`**                           | `bigint(8)`        | `not null, primary key`
# **`show_meeting_board`**           | `boolean`          | `default(TRUE), not null`
# **`text`**                         | `text(65535)`      | `not null`
# **`created_at`**                   | `datetime`         | `not null`
# **`updated_at`**                   | `datetime`         | `not null`
# **`key_result_comment_label_id`**  | `bigint(8)`        |
# **`key_result_id`**                | `integer`          | `not null`
# **`user_id`**                      | `integer`          | `not null`
#


class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :key_result, touch: true
  belongs_to :key_result_comment_label, optional: true

  after_create do
    NotificationMailer.send_add_kr_comment(Current.user, key_result, self)
  end
end

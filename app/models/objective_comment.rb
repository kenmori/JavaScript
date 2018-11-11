# ## Schema Information
#
# Table name: `objective_comments`
#
# ### Columns
#
# Name                        | Type               | Attributes
# --------------------------- | ------------------ | ---------------------------
# **`id`**                    | `bigint(8)`        | `not null, primary key`
# **`show_meeting_board`**    | `boolean`          |
# **`text`**                  | `text(65535)`      |
# **`created_at`**            | `datetime`         | `not null`
# **`updated_at`**            | `datetime`         | `not null`
# **`objective_comment_id`**  | `integer`          |
# **`objective_id`**          | `integer`          |
# **`user_id`**               | `integer`          |
#

class ObjectiveComment < ApplicationRecord
  belongs_to :objective, touch: true
  belongs_to :user
  belongs_to :objective_comment_label, optional: true
end

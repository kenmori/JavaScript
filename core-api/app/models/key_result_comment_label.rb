# frozen_string_literal: true

# ## Schema Information
#
# Table name: `key_result_comment_labels`
#
# ### Columns
#
# Name                   | Type               | Attributes
# ---------------------- | ------------------ | ---------------------------
# **`id`**               | `bigint(8)`        | `not null, primary key`
# **`color`**            | `string(255)`      | `not null`
# **`name`**             | `string(255)`      | `not null`
# **`created_at`**       | `datetime`         | `not null`
# **`updated_at`**       | `datetime`         | `not null`
# **`organization_id`**  | `bigint(8)`        |
#

class KeyResultCommentLabel < ApplicationRecord
  belongs_to :organization
end

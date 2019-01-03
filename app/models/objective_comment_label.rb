# frozen_string_literal: true

# ## Schema Information
#
# Table name: `objective_comment_labels`
#
# ### Columns
#
# Name                   | Type               | Attributes
# ---------------------- | ------------------ | ---------------------------
# **`id`**               | `bigint(8)`        | `not null, primary key`
# **`color`**            | `string(255)`      |
# **`name`**             | `string(255)`      |
# **`created_at`**       | `datetime`         | `not null`
# **`updated_at`**       | `datetime`         | `not null`
# **`organization_id`**  | `bigint(8)`        |
#

class ObjectiveCommentLabel < ApplicationRecord
  belongs_to :organization
end

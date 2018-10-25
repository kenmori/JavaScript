# frozen_string_literal: true

# ## Schema Information
#
# Table name: `objective_orders`
#
# ### Columns
#
# Name                 | Type               | Attributes
# -------------------- | ------------------ | ---------------------------
# **`id`**             | `bigint(8)`        | `not null, primary key`
# **`list`**           | `string(255)`      |
# **`created_at`**     | `datetime`         | `not null`
# **`updated_at`**     | `datetime`         | `not null`
# **`okr_period_id`**  | `integer`          | `not null`
# **`user_id`**        | `integer`          | `not null`
#


class ObjectiveOrder < ApplicationRecord
  belongs_to :user
  belongs_to :okr_period
end

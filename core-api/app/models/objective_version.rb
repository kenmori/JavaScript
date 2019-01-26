# frozen_string_literal: true

# ## Schema Information
#
# Table name: `objective_versions`
#
# ### Columns
#
# Name                  | Type               | Attributes
# --------------------- | ------------------ | ---------------------------
# **`id`**              | `bigint(8)`        | `not null, primary key`
# **`event`**           | `string(255)`      | `not null`
# **`item_type`**       | `string(191)`      | `not null`
# **`object`**          | `text(4294967295)`  |
# **`object_changes`**  | `text(4294967295)`  |
# **`whodunnit`**       | `string(255)`      |
# **`created_at`**      | `datetime`         |
# **`item_id`**         | `integer`          | `not null`
#

class ObjectiveVersion < PaperTrail::Version
  self.table_name = :objective_versions

  def user
    User.find(whodunnit)
  end
end

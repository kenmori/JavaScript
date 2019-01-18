# ## Schema Information
#
# Table name: `key_result_versions`
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

class KeyResultVersion < PaperTrail::Version
  self.table_name = :key_result_versions

  def user
    User.find(whodunnit)
  end
end

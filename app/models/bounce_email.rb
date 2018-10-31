# ## Schema Information
#
# Table name: `bounce_emails`
#
# ### Columns
#
# Name              | Type               | Attributes
# ----------------- | ------------------ | ---------------------------
# **`id`**          | `bigint(8)`        | `not null, primary key`
# **`email`**       | `string(255)`      | `not null`
# **`sent_at`**     | `datetime`         | `not null`
# **`created_at`**  | `datetime`         | `not null`
# **`updated_at`**  | `datetime`         | `not null`
#

class BounceEmail < ApplicationRecord
end

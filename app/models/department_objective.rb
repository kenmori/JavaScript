# ## Schema Information
#
# Table name: `department_objectives`
#
# ### Columns
#
# Name                 | Type               | Attributes
# -------------------- | ------------------ | ---------------------------
# **`id`**             | `bigint(8)`        | `not null, primary key`
# **`created_at`**     | `datetime`         | `not null`
# **`updated_at`**     | `datetime`         | `not null`
# **`department_id`**  | `bigint(8)`        | `not null`
# **`objective_id`**   | `bigint(8)`        | `not null`
#

class DepartmentObjective < ApplicationRecord
  belongs_to :department
  belongs_to :objective
end

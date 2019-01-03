# frozen_string_literal: true

# ## Schema Information
#
# Table name: `objective_comments`
#
# ### Columns
#
# Name                              | Type               | Attributes
# --------------------------------- | ------------------ | ---------------------------
# **`id`**                          | `bigint(8)`        | `not null, primary key`
# **`show_meeting_board`**          | `boolean`          | `default(TRUE)`
# **`text`**                        | `text(65535)`      |
# **`created_at`**                  | `datetime`         | `not null`
# **`updated_at`**                  | `datetime`         | `not null`
# **`objective_comment_label_id`**  | `bigint(8)`        |
# **`objective_id`**                | `integer`          |
# **`user_id`**                     | `integer`          |
#

class ObjectiveComment < ApplicationRecord
  belongs_to :objective, touch: true
  belongs_to :user
  belongs_to :objective_comment_label, optional: true

  after_create do
    # コメントを追加した objective に関連するすべてのユーザーにメールを送信する
    target_users = []
    target_users.push(objective.owner)
    objective.key_results.each do |key_result|
      target_users.push(key_result.owner)
      key_result.members.each do |member|
        target_users.push(member)
      end
    end

    # 関係者まで含めると重複が多くなるため uniq で一意にする
    target_users.uniq.each do |user|
      NotificationMailer.update_o_comment(Current.user, objective, user).deliver_later
    end
  end
end

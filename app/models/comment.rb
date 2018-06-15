class Comment < ApplicationRecord
    belongs_to :user
    belongs_to :key_result, touch: true

    after_create do
        NotificationMailer.send_add_kr_comment(Current.user, key_result, self)
    end
end

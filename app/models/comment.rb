class Comment < ApplicationRecord
    belongs_to :user
    belongs_to :key_result, touch: true
end

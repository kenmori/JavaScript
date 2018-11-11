FactoryBot.define do
  factory :objective_comment do
    objective_id { 1 }
    user_id { 1 }
    text { "MyText" }
    objective_comment_id { 1 }
    show_meeting_board { false }
  end
end

# frozen_string_literal: true

require_relative "abstract_active_record_factory"

class CommentFactory < AbstractActiveRecordFactory
  def initialize(key_result:, user:, key_result_comment_label: nil)
    super(Comment.new)
    @key_result = key_result
    @user = user
    @key_result_comment_label = key_result_comment_label
  end
  attr_reader :key_result, :user, :key_result_comment_label

  private

    def default_params
      {
        key_result: key_result,
        user: user,
        text: "新しいコメント",
        show_meeting_board: true,
        key_result_comment_label: key_result_comment_label
      }
    end
end

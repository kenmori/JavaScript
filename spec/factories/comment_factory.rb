# frozen_string_literal: true

require_relative "abstract_factory"

class CommentFactory < AbstractFactory
  def initialize(key_result:, user:)
    super(Comment.new)
    @key_result = key_result
    @user = user
  end
  attr_reader :key_result, :user

  private

    def default_params
      {
        key_result: key_result,
        user: user,
        text: "新しいコメント",
        show_meeting_board: true,
        key_result_comment_label: nil
      }
    end
end

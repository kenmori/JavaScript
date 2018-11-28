# frozen_string_literal: true

require_relative "abstract_factory"

class ObjectiveCommentFactory < AbstractFactory
  def initialize(objective:, user:)
    super(Comment.new)
    @objective = objective
    @user = user
  end
  attr_reader :objective, :user

  private

  def default_params
    {
      objective: @objective,
      user: user,
      text: "新しいコメント",
      show_meeting_board: false,
      objective_comment_label: nil
    }
  end
end

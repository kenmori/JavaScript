# frozen_string_literal: true

module CommentDecorator
  def editable?
    user_id == current_user.id || key_result.owner.id == current_user.id || key_result.objective.owner.id == current_user.id || current_user.admin?
  end
end

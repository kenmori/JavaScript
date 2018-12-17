# frozen_string_literal: true

module ObjectiveCommentDecorator
  def editable?
    user_id == current_user.id ||  current_user.admin?
  end
end

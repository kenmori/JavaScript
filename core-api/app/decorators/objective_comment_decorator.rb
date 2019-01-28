# frozen_string_literal: true

module ObjectiveCommentDecorator
  def editable?(operator)
    user_id == operator.id || operator.admin?
  end
end

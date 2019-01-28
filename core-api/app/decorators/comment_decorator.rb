# frozen_string_literal: true

module CommentDecorator
  def editable?(operator)
    user_id == operator.id || key_result.owner.id == operator.id || key_result.objective.owner.id == operator.id || operator.admin?
  end
end

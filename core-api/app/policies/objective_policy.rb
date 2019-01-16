# frozen_string_literal: true

class ObjectivePolicy
  include PolicyHelper

  def initialize(current_user, objective)
    @current_user = current_user
    @objective = objective
  end

  def history?
    same_organization?(@objective.okr_period)
  end
end

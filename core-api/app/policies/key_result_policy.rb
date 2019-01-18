# frozen_string_literal: true

class KeyResultPolicy
  include PolicyHelper

  def initialize(current_user, key_result)
    @current_user = current_user
    @key_result = key_result
  end

  def history?
    same_organization?(@key_result.okr_period)
  end
end

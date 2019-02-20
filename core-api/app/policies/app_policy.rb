# frozen_string_literal: true

class AppPolicy
  include PolicyHelper

  def initialize(current_user, organization)
    @current_user = current_user
    @organization = organization
  end

  def integrate_slack?
    current_user_admin?
  end

  def segregate_slack?
    current_user_admin?
  end
end

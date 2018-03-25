class HomeController < ApplicationController
  skip_before_action :authenticate_user!, only: [:non_login]

  def index
    user = current_user
    gon.login_user = user
    gon.is_admin = user.admin?
    gon.login_user_avatar_url = user.avatar_url
    gon.organizations = user.organizations
    gon.objective_order = user.objective_order
    organization = current_organization
    gon.organization = organization
    gon.okr_period = organization.current_okr_period
  end

  def non_login
  end
end

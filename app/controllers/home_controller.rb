class HomeController < ApplicationController
  skip_before_action :authenticate_user!, only: [:non_login]

  def index
    gon.login_user = current_user
    gon.is_admin = current_user.admin?
    gon.login_user_avatar_url = current_user.avatar_url
    gon.organization = current_user.organization
    gon.organizations = current_user.organizations
    gon.okr_period = current_user.organization.current_okr_period
  end

  def non_login
  end
end

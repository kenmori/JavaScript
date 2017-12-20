class HomeController < ApplicationController
  skip_before_action :authenticate_user!, only: [:non_login]

  def index
    gon.login_user = current_user
    gon.login_user_avatar_url = current_user.avatar_url
    gon.organizations = current_user.organizations
    gon.okr_period = current_user.organization.okr_periods.active.first
  end

  def non_login
  end
end

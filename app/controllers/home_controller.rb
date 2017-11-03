class HomeController < ApplicationController
  skip_before_action :authenticate_user!, only: [:non_login]

  def index
    gon.login_user = current_user
    gon.organization = current_user.organization
    gon.okr_period = current_user.organization.okr_periods.active.first
  end

  def non_login
  end
end

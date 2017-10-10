class HomeController < ApplicationController
  def index
    gon.login_user = current_user
    gon.organization = current_user.organization
    gon.okr_period = current_user.organization.okr_periods.active.first
  end
end

# frozen_string_literal: true

class HomeController < ApplicationController
  skip_before_action :authenticate_user!, only: [:non_login]

  def index
    gon.login_user = current_user
    gon.organization = current_organization
    gon.owner_id = current_organization.owner&.id
    gon.okr_period = current_organization.current_okr_period
    gon.user_setting = current_user.user_setting
  end

  def non_login; end
end

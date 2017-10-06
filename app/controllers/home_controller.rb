class HomeController < ApplicationController
  def index
    gon.current_user = current_user
    gon.organization = OrganizationMember.find_by(user_id: current_user.id).organization
  end
end

# frozen_string_literal: true

class AppsController < ApplicationController
  def integrate_slack
    runner(App::IntegrateSlack, organization_id: current_organization.id, code: params[:code])
  end

  def segregate_slack
    runner(App::SegregateSlack, organization_id: current_organization.id)
  end
end

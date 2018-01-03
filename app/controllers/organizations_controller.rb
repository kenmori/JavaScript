class OrganizationsController < ApplicationController

  def show
    @organization = Organization.find(params[:id])
  end

  def update
    forbidden and return unless valid_permission?(params[:id]) && current_user.admin?

    @organization = Organization.find(params[:id])
    if @organization.update(organization_params)
      render status: :ok
    else
      unprocessable_entity_with_errors(@organization.errors)
    end
  end

  private

  def organization_params
    params.require(:organization)
        .permit(:id, :name, :logo, :remove_logo)
  end
  
end

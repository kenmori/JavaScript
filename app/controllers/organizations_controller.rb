class OrganizationsController < ApplicationController

  def update
    @organization = Organization.find(params[:id])
    if @organization.update(organization_params)
      render status: :ok
    else
      render json: @organization.errors, status: :unprocessable_entity
    end
  end

  private

  def organization_params
    params.require(:organization)
        .permit(:id, :name, :logo, :remove_logo)
  end
  
end

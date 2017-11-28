class OrganizationsController < ApplicationController
  skip_before_action :authenticate_user!
  
  def update
    @organization = Organization.find(params[:id])
    if @organization.update(organization_params)
      render action: :create, status: :ok
    else
      render json: @organization.errors, status: :unprocessable_entity
    end
  end

  private

  def organization_params
    params.require(:organization)
        .permit(:id, :name)
  end
end

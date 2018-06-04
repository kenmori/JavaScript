class OrganizationsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:create]

  def show
    forbidden and return unless valid_permission?(params[:id])
    @organization = Organization.find(params[:id])
  end

  def create
    ActiveRecord::Base.transaction do
      @organization = Organization.create!(create_params)
      @organization.users.create!(create_user_params)
      @organization.okr_periods.create!(create_okr_period_params)
    end
    render status: :created
  rescue
    unprocessable_entity_with_errors(@organization.errors.full_messages)
  end

  def update
    forbidden and return unless valid_permission?(params[:id]) && current_user.admin?

    @organization = Organization.find(params[:id])
    if @organization.update(update_params)
      render action: :create, status: :ok
    else
      unprocessable_entity_with_errors(@organization.errors.full_messages)
    end
  end

  private

  def create_params
    params.require(:organization).permit(:name, :okr_span)
  end

  def create_user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :admin)
  end

  def create_okr_period_params
    params.require(:okr_period).permit(:month_start, :month_end)
  end

  def update_params
    params.require(:organization).permit(:id, :name, :logo, :remove_logo, :okr_span)
  end
  
end

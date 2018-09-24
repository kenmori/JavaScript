# frozen_string_literal: true

class OrganizationsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:create]

  def show
    forbidden && return unless valid_permission?(params[:id])
    @organization = Organization.find(params[:id])
  end

  def create
    ActiveRecord::Base.transaction do
      @organization = Organization.create!(create_params)
      @organization.users.create!(create_user_params)
      @organization.okr_periods.create!(create_okr_period_params)
    end
    # トラッキング：新規アカウント作成
    TrackingMailer.create_account(@organization).deliver_later
    render status: :created
  rescue StandardError => e
    if @organization&.errors&.any?
      unprocessable_entity_with_errors(@organization.errors.full_messages)
    else
      unprocessable_entity(e.message)
    end
  end

  def update
    forbidden && return unless valid_permission?(params[:id]) && current_user.admin?

    @organization = Organization.find(params[:id])
    if @organization.update(update_params)
      render action: :create, status: :ok
    else
      unprocessable_entity_with_errors(@organization.errors.full_messages)
    end
  end

  def update_owner
    forbidden && return unless valid_permission?(params[:id]) && current_user.admin?

    @organization = Organization.find(params[:id])
    ActiveRecord::Base.transaction do
      @organization.organization_members.where(role: :owner).each do |owner|
        owner.update!(role: :member)
      end

      user_id = params[:organization_member]["user"]
      new_owner = @organization.organization_members.find_by(user_id: user_id)
      new_owner.update!(role: :owner)
    end
  rescue StandardError => e
    unprocessable_entity(e.message)
  end

  private

    def create_params
      params.require(:organization).permit(:name, :okr_span)
    end

    def create_user_params
      params.require(:user).permit(:first_name, :last_name, :email, :password, :admin)
    end

    def create_okr_period_params
      params.require(:okr_period).permit(:start_date, :end_date)
    end

    def update_params
      params.require(:organization).permit(:id, :name, :logo, :remove_logo, :okr_span)
    end
end

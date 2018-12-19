# frozen_string_literal: true

class DepartmentsController < ApplicationController
  skip_before_action :verify_authenticity_token, if: -> { Rails.env.stating? }

  def index
    concept_params = {
      organization_id: current_organization.id,
      ids: params[:ids]
    }

    runner(Department::Index, concept_params) do |result|
      render json: { departments: result[:query] }, status: :ok
    end
  end

  def create
    concept_params = params["department"].merge(organization_id: current_organization.id)

    runner(Department::Create, concept_params) do |result|
      @department = result[:model]
      render status: :created
    end
  end

  def update
    concept_params = params[:department].merge(
      id: params[:id],
      organization_id: current_organization.id
    )

    runner(Department::Update, concept_params) do |result|
      @department = result[:model]
      render :create, status: :ok
    end
  end

  def destroy
    runner(Department::Archive, {id: params[:id]})
  end

  def restore
    runner(Department::Restore, {id: params[:id]})
  end
end

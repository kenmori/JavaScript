# frozen_string_literal: true

class DepartmentsController < ApplicationController
  skip_before_action :verify_authenticity_token, if: :staging?

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

  private

    # TODO 適切な場所に移動する
    def runner(concept, params)
      result = concept.call(params: params, current_user: current_user)

      if result.success?
        yield result if block_given?
        return true
      end

      if result["result.policy.default"]&.failure?
        render_error_json(:forbidden, I18n.t("http_status.forbidden"))
      elsif result["result.contract.default"]&.failure?
        render_error_json(:bad_request, result["contract.default"].errors.full_messages)
      else
        render_error_json(:bad_request, I18n.t("http_status.code_400"))
      end
      false
    end

    def staging?
      Rails.env.stating?
    end
end

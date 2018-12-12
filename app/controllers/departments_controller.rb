# frozen_string_literal: true

class DepartmentsController < ApplicationController
  # TODO punditはconceptに移す
  before_action :authorize!, except: :restore
  skip_before_action :verify_authenticity_token, if: :staging?

  def index
    result = Department::Index.call(
      params: {
        organization_id: current_organization.id,
        ids: params[:ids]
      }
    )

    if result.success?
      render json: { departments: result[:query] }, status: :ok
    else
      render_contract_errors(result)
    end
  end

  def create
    result = Department::Create.call(
      params: params["department"].merge(organization_id: current_organization.id)
    )

    if result.success?
      @department = result[:model]
      render status: :created
    else
      render_contract_errors(result)
    end
  end

  def update
    result = Department::Update.call(
      params: params[:department].merge(
        id: params[:id],
        organization_id: current_organization.id
      )
    )

    if result.success?
      @department = result[:model]
      render :create, status: :ok
    else
      render_contract_errors(result)
    end
  end

  def destroy
    result = Department::Archive.call(
      params: { id: params[:id] }
    )

    if result.success?
      head :no_content
    else
      render_contract_errors(result)
    end
  end

  def restore
    runner(Department::Restore, {id: params[:id]}) do
      head :no_content and return
    end
  end

  private

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

    # TODO department object を用いた権限管理をするには concept の中で pundit を使うほうがよい
    def authorize!
      authorize Department
    end

    def staging?
      Rails.env.stating?
    end
end

class OkrSettingsController < ApplicationController
  def show
    forbidden and return unless valid_permission?(params[:organization_id])

    render json: OkrSetting.find(params[:organization_id])
  end

  def create
    forbidden and return unless valid_permission?(params[:organization_id])

    @okr_settings = OkrSetting.find(params[:organization_id])
    if @okr_settings.reset
      render json: @okr_settings, status: :created
    else
      unprocessable_entity_with_errors(@user.errors)
    end
  end

  def update
    forbidden and return unless valid_permission?(params[:organization_id])

    @okr_settings = OkrSetting.find(params[:organization_id])
    if @okr_settings.update(okr_settings_params)
      render json: @okr_settings, status: :ok
    else
      unprocessable_entity_with_errors(@okr_settings.errors)
    end
  end

  private

  def okr_settings_params
    params.require(:okr_settings)
        .permit(:year_end, :span,
                :ready_from, :ready_to,
                :review_during_from, :review_during_to,
                :review_end_from, :review_end_to)
  end
end

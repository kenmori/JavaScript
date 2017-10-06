class OkrSettingsController < ApplicationController
  def show
    render json: OkrSetting.find(params[:id])
  end

  def update
    @okr_settings = OkrSetting.find(params[:id])
    if @okr_settings.update(okr_settings_params)
      render json: @okr_settings, status: :ok
    else
      render json: @okr_settings.errors, status: :unprocessable_entity
    end
  end

  def okr_settings_params
    params.require(:okr_settings)
        .permit(:year_end, :span,
                :ready_from, :ready_to,
                :review_during_from, :review_during_to,
                :review_end_from, :review_end_to)
  end
end

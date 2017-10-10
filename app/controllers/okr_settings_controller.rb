class OkrSettingsController < ApplicationController
  def show
    @okr_settings = OkrSetting.find_by_id(params[:id])
    if @okr_settings
      render json: @okr_settings
    else
      OkrSetting.create(organization_id: params[:id])
      create
    end
  end

  def create
    @okr_settings = OkrSetting.find(params[:id])
    if @okr_settings.update(
        year_end: 3, span: 3,
        ready_from: 20, ready_to: 1,
        review_during_from: 45, review_during_to: 50,
        review_end_from: 1, review_end_to: 7)
      render json: @okr_settings, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
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

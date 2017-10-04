class OkrSettingsController < ApplicationController
  def show
    render json: OkrSetting.find(params[:id])
  end
end

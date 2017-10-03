class SettingsController < ApplicationController
  def show
    render json: Setting.find(params[:id])
  end
end

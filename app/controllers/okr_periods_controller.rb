class OkrPeriodsController < ApplicationController
  def index
    forbidden and return unless valid_permission?(params[:organization_id])

    periods = params[:organization_id] ?
                OkrPeriod.where(organization_id: params[:organization_id]).order(:year, :period_number) :
                OkrPeriod.all.order(:year, :period_number)

    render json: periods
  end
end

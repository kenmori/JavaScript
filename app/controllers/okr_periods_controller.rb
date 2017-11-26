class OkrPeriodsController < ApplicationController
  def index
    periods = params['organization_id'] ?
                OkrPeriod.where(organization_id: params['organization_id']).order(:year, :period_number) :
                OkrPeriod.all.order(:year, :period_number)

    render json: periods
  end
end

class OkrPeriodsController < ApplicationController
  def index
    render json: OkrPeriod.all.order(:year, :period_number)
  end
end

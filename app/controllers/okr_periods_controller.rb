class OkrPeriodsController < ApplicationController
  def create
    forbidden and return unless valid_permission?(params[:okr_period][:organization_id]) && current_user.admin?
    @okr_period = OkrPeriod.new(okr_period_params)
    if @okr_period.save
      render status: :created
    else
      unprocessable_entity_with_errors(@okr_period.errors)
    end
  end

  def update
    @okr_period = OkrPeriod.find(params[:id])
    forbidden and return unless valid_permission?(@okr_period.organization_id) && current_user.admin?
    if @okr_period.update(okr_period_params)
      render action: :create, status: :ok
    else
      unprocessable_entity_with_errors(@okr_period.errors)
    end
  end

  def destroy
    @okr_period = OkrPeriod.find(params[:id])
    forbidden and return unless valid_permission?(@okr_period.organization_id) && current_user.admin?

    if @okr_period.destroy
      head :no_content
    else
      unprocessable_entity_with_errors(@okr_period.errors)
    end
  
  end

  private

  def okr_period_params
    params.require(:okr_period)
      .permit(:name, :month_start, :month_end, :organization_id)
  end

end

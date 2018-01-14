class OkrPeriodsController < ApplicationController
  def create
    forbidden and return unless valid_permission?(params[:okr_period][:organization_id]) && current_user.admin?
    @okr_period = OkrPeriod.new(okr_period_params)
    if valid_month_start_and_month_end && @okr_period.save
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

  def valid_month_start_and_month_end
    p "----"
    p @okr_period.month_start, @okr_period.month_end, @okr_period.month_start >= @okr_period.month_end
    if @okr_period.month_start >= @okr_period.month_end
      @okr_period.errors[:error] << "期間が不正です。"
      return false 
    end

    periods = OkrPeriod.where(organization_id: @okr_period.organization_id).pluck(:month_start, :month_end)
    periods.each do |period|
      if @okr_period.month_start.between?(period[0], period[1]) || @okr_period.month_end.between?(period[0], period[1])
        @okr_period.errors[:error] << "期間が重複しています。"
        return false
      end
    end

    return true
  end

  def okr_period_params
    params.require(:okr_period)
      .permit(:name, :month_start, :month_end, :organization_id)
  end

end

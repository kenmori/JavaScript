class OkrPeriodsController < ApplicationController
  def create
    forbidden and return unless valid_permission?(params[:okr_period][:organization_id]) && current_user.admin?
    @okr_period = OkrPeriod.new(okr_period_params)
    @okr_period.name = valid_name
    if valid_month_start_and_month_end && @okr_period.save
      render status: :created
    else
      unprocessable_entity_with_errors(@okr_period.errors)
    end
  end

  def update
    @okr_period = OkrPeriod.find(params[:id])
    @okr_period.name = valid_name
    forbidden and return unless valid_permission?(@okr_period.organization_id) && current_user.admin?
    if valid_month_start_and_month_end && @okr_period.update(okr_period_params)
      render action: :create, status: :ok
    else
      unprocessable_entity_with_errors(@okr_period.errors)
    end
  end

  def destroy
    @okr_period = OkrPeriod.find(params[:id])
    forbidden and return unless valid_permission?(@okr_period.organization_id) && current_user.admin?

    if can_delete? && @okr_period.destroy
      head :no_content
    else
      unprocessable_entity_with_errors(@okr_period.errors)
    end
  
  end

  private

  def can_delete?
    return true if @okr_period.objectives.blank? && @okr_period.key_results.blank?
    @okr_period.errors[:error] << "関連するObjective、またはKeyResultが存在するため削除できません。"
    return false
  end 

  def valid_name
    nil if params[:name] === ""
  end

  def valid_month_start_and_month_end
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

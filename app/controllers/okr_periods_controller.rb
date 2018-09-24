# frozen_string_literal: true

class OkrPeriodsController < ApplicationController
  def create
    forbidden && return unless valid_permission?(params[:okr_period][:organization_id]) && current_user.admin?
    @okr_period = OkrPeriod.new(okr_period_params)
    if valid_start_date_and_end_date && @okr_period.save
      render status: :created
    else
      unprocessable_entity_with_errors(@okr_period.errors.full_messages)
    end
  end

  def update
    @okr_period = OkrPeriod.find(params[:id])
    forbidden && return unless valid_permission?(@okr_period.organization_id) && current_user.admin?
    if valid_start_date_and_end_date && @okr_period.update(okr_period_params)
      render action: :create, status: :ok
    else
      unprocessable_entity_with_errors(@okr_period.errors.full_messages)
    end
  end

  def destroy
    @okr_period = OkrPeriod.find(params[:id])
    forbidden && return unless valid_permission?(@okr_period.organization_id) && current_user.admin?

    if can_delete? && @okr_period.destroy
      head :no_content
    else
      unprocessable_entity_with_errors(@okr_period.errors.full_messages)
    end
  end

  def export_okrs
    @okr_period = OkrPeriod.find(params[:id])
    forbidden && return unless valid_permission?(@okr_period.organization_id) && current_user.admin?

    filename = "OKR_#{@okr_period.organization.name}_#{@okr_period.start_date}_#{@okr_period.end_date}.csv"
    send_data render_to_string, filename: filename, type: :csv
  end

  private

    def can_delete?
      return true if @okr_period.objectives.empty? && @okr_period.key_results.empty?

      @okr_period.errors[:base] << "Objective または Key Result が紐付いているため削除できません"
      false
    end

    def valid_start_date_and_end_date
      start_date = params[:okr_period][:start_date]
      end_date = params[:okr_period][:end_date]
      if start_date.present? && end_date.present? && start_date.to_date >= end_date.to_date
        @okr_period.errors[:base] << "無効な期間です"
        return false
      end

      periods = OkrPeriod
                .where(organization_id: @okr_period.organization_id)
                .where.not(id: @okr_period.id)
                .pluck(:start_date, :end_date)
      periods.each do |period|
        is_invalid_start_date = start_date.present? ? start_date.to_date.between?(period[0], period[1]) : false
        is_invalid_end_date = end_date.present? ? end_date.to_date.between?(period[0], period[1]) : false
        if is_invalid_start_date || is_invalid_end_date
          @okr_period.errors[:base] << "期間が重複しています"
          return false
        end
      end

      true
    end

    def okr_period_params
      params.require(:okr_period)
            .permit(:name, :start_date, :end_date, :organization_id)
    end
end

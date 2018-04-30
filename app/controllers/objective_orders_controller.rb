class ObjectiveOrdersController < ApplicationController
  def create_or_update
    user = User.find(params[:objective_order][:user_id])
    forbidden and return unless valid_permission?(user.organization.id)
    forbidden and return unless current_user.id == user.id

    @objective_order = user.objective_orders.find_or_initialize_by(okr_period_id: params[:objective_order][:okr_period_id])
    if @objective_order.update(create_or_update_params)
      render action: :create, status: :ok
    else
      unprocessable_entity_with_errors(@objective_order.errors.full_messages)
    end
  end

  private

  def create_or_update_params
    params.require(:objective_order).permit(:user_id, :okr_period_id, :list)
  end
end

# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :valid_operatable_user?, except: :create

  def create
    runner(User::Create, params[:user]) do |result|
      @user = result[:model]
      render status: :created
    end
  end

  # TODO User::Update を使うように変更する
  # TODO valid_operatable_user? を外す
  # TODO valid_permission? を UserPolicy に移動
  # TODO update_user_params メソッドを削除
  def update
    # runner(User::Update, params[:user]) do |result|
    #   @user = result[:model]
    #   render action: :create, status: :ok
    # end

    @user = User.find(params[:id])
    forbidden and return unless valid_permission?(@user.organization.id)

    if @user.update(update_user_params)
      render action: :create, status: :ok
    else
      unprocessable_entity_with_errors(@user.errors.full_messages)
    end
  end

  def update_password
    if current_user.update_with_password(password_params)
      bypass_sign_in(current_user)
      render json: current_user, status: :ok
    else
      unprocessable_entity_with_errors(current_user.errors.full_messages)
    end
  end

  def update_disabled
    @user = User.find(params[:id])
    forbidden and return unless valid_permission?(@user.organization.id)

    disabled = params[:disabled]
    if @user.update_attribute(:disabled_at, disabled ? Time.current : nil)
      render action: :show, status: :ok
    else
      unprocessable_entity_with_errors(@user.errors.full_messages)
    end
  end

  def resend
    @user = User.find(params[:id])
    forbidden and return unless valid_permission?(@user.organization.id)
    if @user.resend_confirmation_instructions
      head :no_content
    else
      unprocessable_entity_with_errors(@user.errors.full_messages)
    end
  end

  def update_user_setting
    user = User.find(params[:id])
    forbidden and return unless valid_permission?(user.organization.id)
    forbidden and return unless current_user.id == user.id

    @user_setting = user.user_setting
    unless @user_setting.update(user_setting_params)
      unprocessable_entity_with_errors(@user_setting.errors.full_messages)
    end
  end

  def update_objective_order
    user = User.find(params[:id])
    forbidden and return unless valid_permission?(user.organization.id)
    forbidden and return unless current_user.id == user.id

    @objective_order = user.objective_orders.find_or_initialize_by(okr_period_id: params[:objective_order][:okr_period_id])
    unless @objective_order.update(objective_order_params)
      unprocessable_entity_with_errors(@objective_order.errors.full_messages)
    end
  end

  private

    def update_user_params
      params.require(:user).permit(:id, :first_name, :last_name, :email, :password, :avatar, :remove_avatar, :admin)
    end

    def password_params
      params.require(:user)
            .permit(:id, :password, :password_confirmation, :current_password)
    end

    def user_setting_params
      params.require(:user_setting)
            .permit(:show_child_objectives, :show_objective_key_results, :show_member_key_results, :show_disabled_okrs, :notify_remind_email_enabled)
    end

    def objective_order_params
      params.require(:objective_order).permit(:okr_period_id, :list)
    end

    def valid_operatable_user?
      user_id = params[:id]
      forbidden and return unless current_user.id == user_id.to_i || current_user.admin?
    end
end

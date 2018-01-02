class UsersController < ApplicationController
  before_action :valid_operatable_user?, except: [:create]
  skip_before_action :authenticate_user!, only: [:create]

  def show
    user = User.find(params[:id])
    forbidden and return unless valid_permission?(user.organization.id)

    render json: user
  end

  def create
    @user = User.create_user_with_organization!(current_user,
                                               user_params, 
                                               params[:user][:organization_name],
                                               params[:user][:organization_uniq_name])
    render status: :created
  rescue => e
    unprocessable_entity(e.message)
  end

  def update
    @user = User.find(params[:id])
    forbidden and return unless valid_permission?(@user.organization.id)

    if @user.update(user_params)
      render action: :create, status: :ok
    else
      unprocessable_entity_with_errors(@user.errors)
    end
  end

  def update_password
    if current_user.update_with_password(password_params)
      bypass_sign_in(current_user)
      render json: current_user, status: :ok
    else
      unprocessable_entity_with_errors(current_user.errors)
    end
  end

  def destroy
    @user = User.find(params[:id])
    forbidden and return unless valid_permission?(@user.organization.id)

    if @user.destroy
      head :no_content
    else
      unprocessable_entity_with_errors(@user.errors)
    end
  end

  def update_current_organization_id
    @user = User.find(params[:user_id])
    forbidden and return unless valid_permission?(@user.organization.id)

    if @user.update(current_organization_id: params['user'][:organization_id])
      render action: :create, status: :ok
    else
      unprocessable_entity_with_errors(@user.errors)
    end
  end

  private

  def user_params
    params.require(:user)
        .permit(:id, 
                :first_name, 
                :last_name,
                :email,
                :password,
                :avatar,
                :remove_avatar,
                :current_organization_id,
                :no_password_required,
                :admin)
  end

  def password_params
    params.require(:user)
        .permit(:id, :password, :password_confirmation, :current_password)
  end

  def valid_operatable_user?
    forbidden and return unless current_user.id == params[:id].to_i || current_user.admin?
  end
  
end

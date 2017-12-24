class UsersController < ApplicationController
  skip_before_action :authenticate_user!, only: [:create]

  def index
    @users = current_user.organization.members
  end

  def show
    render json: User.find(params[:id])
  end

  def create
    @user = User.create_user_with_organization!(current_user,
                                               user_params, 
                                               params[:user][:organization_name],
                                               params[:user][:organization_uniq_name])
    render status: :created
  rescue => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render action: :create, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def update_password
    @user = User.find(params[:user_id])
    if @user.update_with_password(password_params)
      bypass_sign_in(@user)
      render json: @user, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @user = User.find(params[:id])
    if @user.destroy
      head :no_content
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def update_current_organization_id
    @user = User.find(params[:user_id])
    if @user.update(current_organization_id: params['user'][:organization_id])
      render action: :create, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user)
        .permit(:id, :first_name, :last_name, :email, :password, :avatar, :remove_avatar, :current_organization_id, :no_password_required)
  end

  def password_params
    params.require(:user)
        .permit(:id, :password, :password_confirmation, :current_password)
  end
  
end

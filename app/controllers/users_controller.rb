class UsersController < ApplicationController
  skip_before_action :authenticate_user!, only: [:create]

  def index
    render json: User.all
  end

  def show
    render json: User.find(params[:id])
  end

  def create
    @user = User.new(user_params)

    # TODO: organization_idの値を正しくする
    ActiveRecord::Base.transaction do
      if @user.save! && OrganizationMember.new(organization_id: 1, user_id: @user.id).save!
        puts @user.id
        render status: :created
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end
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

  private

  def user_params
    params.require(:user)
        .permit(:id, :first_name, :last_name, :email, :password)
  end

  def password_params
    params.require(:user)
        .permit(:id, :password, :password_confirmation, :current_password)
  end
end

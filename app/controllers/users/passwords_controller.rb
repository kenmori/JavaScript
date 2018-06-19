class Users::PasswordsController < Devise::PasswordsController

  # POST /resource/password
  def create
    if User.exists?(email: user_params['email'])
      super
    else
      respond_with({}, location: new_user_password_path)
    end
  end

  private

  def user_params
    params.require(:user)
        .permit(:email)
  end
end
class Users::RegistrationsController < Devise::RegistrationsController
 skip_before_action :authenticate_user!, only: [:sign_up]

  def sign_up

  end
end

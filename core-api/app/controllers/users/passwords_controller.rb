# frozen_string_literal: true

class Users::PasswordsController < Devise::PasswordsController
  # POST /users/password
  def create
    if User.exists?(email: create_params["email"])
      super
    else
      respond_with({}, { location: new_user_password_path })
    end
  end

  # PUT /users/password
  def update
    super do |resource|
      if resource.errors.present?
        unprocessable_entity_with_errors(resource.errors.full_messages)
        return
      end
    end
  end

  private

    def create_params
      params.require(resource_name).permit(:email)
    end
end

class Users::ConfirmationsController < Devise::ConfirmationsController

  # GET /users/confirmation?confirmation_token=abcdef
  def show
    self.resource = resource_class.find_by_confirmation_token(params[:confirmation_token])
    if resource.nil? || resource.has_password?
      super do |resource|
        sign_in(resource)
      end
    end
  end

  # PUT /users/confirmation
  def update
    confirmation_token = params[resource_name][:confirmation_token]
    self.resource = resource_class.find_by_confirmation_token!(confirmation_token)

    if resource.update(confirmation_params)
      self.resource = resource_class.confirm_by_token(confirmation_token)
      sign_in(resource)
    else
      unprocessable_entity_with_errors(resource.errors.full_messages)
    end
  end

  private

  def confirmation_params
    params.require(resource_name).permit(:password)
  end
end

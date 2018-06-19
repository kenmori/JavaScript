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
    if resource.update(update_params)
      self.resource = resource_class.confirm_by_token(confirmation_token)
      if resource.errors.empty?
        sign_in(resource)
      else
        unprocessable_entity_with_errors(resource.errors.full_messages)
      end
    else
      unprocessable_entity_with_errors(resource.errors.full_messages)
    end
  end

  private

  def update_params
    params.require(resource_name).permit(:password, :password_confirmation).merge(require_password: true)
  end
end

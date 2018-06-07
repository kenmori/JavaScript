class Users::ConfirmationsController < Devise::ConfirmationsController
  def show
    self.resource = resource_class.find_by_confirmation_token(params[:confirmation_token])
    if resource.nil? || params[:input_password].blank?
      super do |resource|
        sign_in(resource)
      end
    else
      render layout: 'ssr' 
    end
  end

  def confirm
    confirmation_token = params[resource_name][:confirmation_token]
    self.resource = resource_class.find_by_confirmation_token!(confirmation_token)
  
    if resource.update(confirmation_params)
      self.resource = resource_class.confirm_by_token(confirmation_token)
      set_flash_message :notice, :confirmed
      sign_in_and_redirect resource_name, resource
    else
      render :show
    end
  end
  
  private
  
  def confirmation_params
    params.require(resource_name).permit(:password)
  end
end
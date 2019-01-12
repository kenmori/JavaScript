# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  respond_to :json

  # POST /resource/sign_in
  def create
    self.resource = warden.authenticate!(auth_options)
    sign_in(resource_name, resource)
    yield resource if block_given?
    respond_with(resource) do |format|
      format.json do
        render json: { user: resource }, status: 200
      end
    end
  end
end

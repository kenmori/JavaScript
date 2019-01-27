# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # POST /resource/sign_in
  def create
    super do |resource|
      @resource = resource
      @token = request.env['warden-jwt_auth.token']
    end
  end
end

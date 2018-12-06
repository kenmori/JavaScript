# frozen_string_literal: true

class HomeController < ApplicationController
  skip_before_action :authenticate_user!, only: [:non_login]

  def index; end

  def non_login; end
end

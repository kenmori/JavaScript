# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: Rails.application.config.devise.mailer_sender
  layout "mailer"
end

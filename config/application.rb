# frozen_string_literal: true

require_relative "boot"

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "action_cable/engine"
require "sprockets/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Resily
  class Application < Rails::Application
    config.load_defaults 5.2

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    config.time_zone = "Tokyo"
    I18n.enforce_available_locales = true
    config.i18n.load_path += Dir[Rails.root.join("config", "locales", "models", "*.{rb,yml}").to_s]
    config.i18n.default_locale = :ja

    config.generators do |g|
      g.orm :active_record
      g.template_engine :slim
      g.test_framework :rspec, fixture: false
      g.view_specs false
      g.controller_specs false
      g.routing_specs false
      g.helper_specs false
      g.request_specs false
      g.assets false
      g.helper false
      g.system_tests false
    end

    config.autoload_paths += Dir["#{config.root}/lib/"]

    # ActionMailer setting
    config.action_mailer.default_url_options = {
      host: ENV.fetch("MAILER_URL_HOST", "localhost"),
      port: ENV.fetch("MAILER_URL_PORT", 3000)
    }

    # SMTP setting
    config.action_mailer.delivery_method = :smtp
    config.action_mailer.smtp_settings ||= {}.tap do |h|
      h[:address] = ENV.fetch("SMTP_ADDRESS", "mailhog")
      h[:port] = ENV.fetch("SMTP_PORT", 1025)

      start_tls_enabled = ENV.fetch("SMTP_ENABLE_STARTTLS_AUTO", "false") == "true"
      if start_tls_enabled
        h[:domain] = ENV.fetch("SMTP_DOMAIN", "risily.com")
        h[:user_name] = ENV.fetch("SMTP_USER_NAME", "")
        h[:password] = ENV.fetch("SMTP_PASSWORD", "")
        h[:authentication] = "login"
        h[:enable_starttls_auto] = start_tls_enabled
      end
    end

    # Active job
    config.active_job.queue_adapter = :sidekiq

    config.action_dispatch.rescue_responses.merge!(
      "Pundit::NotAuthorizedError" => :forbidden,
      "ConceptInputError" => :bad_request
    )
  end
end

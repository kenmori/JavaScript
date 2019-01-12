# frozen_string_literal: true

host = ENV.fetch("RAILS_REDIS_HOST", "redis")
port = ENV.fetch("RAILS_REDIS_PORT", "6379")

Sidekiq.configure_server do |config|
  config.redis = { url: "redis://#{host}:#{port}", namespace: "sidekiq" }
end

Sidekiq.configure_client do |config|
  config.redis = { url: "redis://#{host}:#{port}", namespace: "sidekiq" }
end

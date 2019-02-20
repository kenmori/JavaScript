# frozen_string_literal: true

class SlackClientFactory
  def self.create_web_client(slack_api_secret = "")
    Slack.configure do |config|
      config.token = slack_api_secret

      # logger
      logger = ActiveSupport::Logger.new(STDOUT)
      logger.formatter = ::Logger::Formatter.new
      config.logger = ActiveSupport::TaggedLogging.new(logger)
    end

    Slack::Web::Client.new
  end
end

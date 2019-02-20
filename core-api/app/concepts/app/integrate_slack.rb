# frozen_string_literal: true

class App::IntegrateSlack < Trailblazer::Operation
  class Form < Reform::Form
    property :code, writeable: false, virtual: true
    property :organization_id, writeable: false, virtual: true
    validates :code, VH[:required]
    validates :organization_id, VH[:required, :natural_number]
  end

  step Model(Organization, :new)
  step Policy::Pundit(AppPolicy, :integrate_slack?)
  step Contract::Build(constant: Form)
  step Contract::Validate()
  step :integrate

  def integrate(options, model:, params:, **_metadata)
    organization = Organization.find(params[:organization_id])
    client = SlackClientFactory.create_web_client

    begin
      response = client.oauth_access(
        client_id: ENV["SLACK_CLIENT_ID"],
        client_secret: ENV["SLACK_CLIENT_SECRET"],
        code: params[:code]
      )
      organization.update!(
        slack_access_token: response["access_token"],
        slack_bot_access_token: response["bot"]["bot_access_token"],
        slack_channel: response["incoming_webhook"]["channel"]
      )
      true
    rescue Slack::Web::Api::Error => e
      Rails.logger.error(e.message)
      Rails.logger.error(e.backtrace.join("\n"))
      raise ConceptInputError, options["contract.default"].errors.full_messages.join(", ")
    end
  end
end

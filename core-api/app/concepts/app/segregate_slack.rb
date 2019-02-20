# frozen_string_literal: true

class App::SegregateSlack < Trailblazer::Operation
  class Form < Reform::Form
    property :organization_id, writeable: false, virtual: true
    validates :organization_id, VH[:required, :natural_number]
  end

  step Model(Organization, :new)
  step Policy::Pundit(AppPolicy, :segregate_slack?)
  step Contract::Build(constant: Form)
  step Contract::Validate()
  step :segregate

  def segregate(options, model:, params:, **_metadata)
    organization = Organization.find(params[:organization_id])

    begin
      organization.update!(
        slack_access_token: nil,
        slack_channel: nil
      )
      true
    rescue Slack::Web::Api::Error => e
      Rails.logger.error(e.message)
      Rails.logger.error(e.backtrace.join("\n"))
      raise ConceptInputError, options["contract.default"].errors.full_messages.join(", ")
    end
  end
end

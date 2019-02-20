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

  def segregate(_options, model:, params:, **_metadata)
    organization = Organization.find(params[:organization_id])
    organization.update!(
      slack_access_token: nil,
      slack_channel: nil
    )
  end
end

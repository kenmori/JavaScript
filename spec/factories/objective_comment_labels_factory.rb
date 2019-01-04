# frozen_string_literal: true

require_relative "abstract_active_record_factory"

class ObjevtiveCommentLabelFactory < AbstractActiveRecordFactory
  def initialize(organization:)
    super(ObjectiveCommentLabel.new)
    @organization = organization
  end
  attr_reader :organization

  private

    def default_params
      {
        organization: organization,
        name: "今週の優先事項",
        color: "blue"
      }
    end
end

# frozen_string_literal: true

require_relative "abstract_factory"

class KeyResultCommentLabelFactory < AbstractFactory
  def initialize(organization:)
    super(KeyResultCommentLabel.new)
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

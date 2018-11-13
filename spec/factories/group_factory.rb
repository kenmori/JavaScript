# frozen_string_literal: true

require_relative "abstract_active_record_factory"

class GroupFactory < AbstractActiveRecordFactory
  def initialize(organization:)
    super(Group.new)
    @organization = organization
  end
  attr_reader :organization

  private

    def default_params
      {
        organization: organization,
        name: "開発部"
      }
    end
end

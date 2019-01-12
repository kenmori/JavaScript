# frozen_string_literal: true

require_relative "abstract_active_record_factory"

class OrganizationFactory < AbstractActiveRecordFactory
  def initialize
    super(Organization.new)
  end

  private

    def default_params
      {
        name: "Test"
      }
    end
end

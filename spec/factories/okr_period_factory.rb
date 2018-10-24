# frozen_string_literal: true

require_relative "abstract_factory"

class OkrPeriodFactory < AbstractFactory
  def initialize(organization:)
    super(OkrPeriod.new)
    @organization = organization
  end
  attr_reader :organization

  private

    def default_params
      {
        organization: organization,
        start_date: 1.week.ago,
        end_date: 1.year.since,
        name: "3Q"
      }
    end
end

# frozen_string_literal: true

require "rspec/expectations"

module TimeFormatMatcher
  extend RSpec::Matchers::DSL

  matcher :be_time_iso8601 do |_expected|
    match do |actual|
      begin
        time = Time.iso8601(actual)
        time.is_a?(Time)
      rescue ArgumentError
        false
      end
    end
  end
end

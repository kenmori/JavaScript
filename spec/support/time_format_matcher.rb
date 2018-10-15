require 'rspec/expectations'

module TimeFormatMatcher
  extend RSpec::Matchers::DSL

  matcher :be_time_iso8601 do |expected|
    match do |actual|
      begin
        time = Time.iso8601(actual)
        time.kind_of?(Time)
      rescue ArgumentError
        false
      end
    end
  end
end

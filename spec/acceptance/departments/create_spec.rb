require "rspec_api_documentation/dsl"
require_dependency Rails.root.join("spec/acceptance/concerns/request_header_json")

RSpec.resource "POST /departments", warden: true do

  include RequestHeaderJson

  # POST   /departments
  post "/departments" do
  end
end

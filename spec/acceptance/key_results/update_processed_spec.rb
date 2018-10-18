# frozen_string_literal: true

require "rspec_api_documentation/dsl"
Rails.root.join("spec/acceptance/concerns").each_child { |path| require_dependency(path) }

RSpec.resource "PUT /key_results/:id/process", warden: true do
  explanation "key_results#update_processed"

  include OrganizationDataset
  include RequestHeaderJson

  before do
    login_as(login_user)
  end

  put "/key_results/:id/process" do
    example "SUCCESS: "
    example "ERROR: "
  end
end

# frozen_string_literal: true
require "rspec_api_documentation/dsl"
require_relative '../concerns/organization_dataset'

RSpec.resource 'PUT /key_results/:id/process', warden: true do
  explanation 'key_results#update_processed'

  include OrganizationDataset

  header 'Content-Type', 'application/json'
  header 'Accept', 'application/json'

  before do
    login_as(login_user)
  end

  put '/key_results/:id/process' do
    example 'SUCCESS: '
    example 'ERROR: '
  end
end

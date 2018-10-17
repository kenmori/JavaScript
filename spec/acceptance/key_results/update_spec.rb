# frozen_string_literal: true
require "rspec_api_documentation/dsl"
require_relative '../concerns/organization_dataset'

RSpec.resource 'PATCH /key_results/:id', warden: true do
  explanation 'key_results#update'

  include OrganizationDataset

  header 'Content-Type', 'application/json'
  header 'Accept', 'application/json'

  before do
    login_as(login_user)
  end

  patch '/key_results/:id' do
  end
end

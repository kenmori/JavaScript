# frozen_string_literal: true
require "rspec_api_documentation/dsl"
Rails.root.join('spec/acceptance/concerns').each_child {|path| require_dependency(path) }

RSpec.resource 'PATCH /key_results/:id', warden: true do
  explanation 'key_results#update'

  include OrganizationDataset
  include RequestHeaderJson

  header 'Content-Type', 'application/json'
  header 'Accept', 'application/json'

  before do
    login_as(login_user)
  end

  patch '/key_results/:id' do
    example 'SUCCESS: '
    example 'ERROR: '
  end
end

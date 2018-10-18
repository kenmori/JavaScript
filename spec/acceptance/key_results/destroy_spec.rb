# frozen_string_literal: true
require "rspec_api_documentation/dsl"
Rails.root.join('spec/acceptance/concerns').each_child {|path| require_dependency(path) }

RSpec.resource 'DELETE /key_results/:id', warden: true do
  explanation 'key_results#destroy'

  include OrganizationDataset
  include RequestHeaderJson

  before do
    login_as(login_user)
  end

  delete '/key_results/:id' do
    example 'SUCCESS: '
    example 'ERROR: '
  end
end

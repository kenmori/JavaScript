# frozen_string_literal: true
require "rspec_api_documentation/dsl"
Rails.root.join('spec/acceptance/concerns').each_child {|path| require_dependency(path) }

RSpec.resource 'GET /key_results/comment_labels', warden: true do
  explanation 'key_results#comment_labels'

  include OrganizationDataset
  include RequestHeaderJson

  header 'Content-Type', 'application/json'
  header 'Accept', 'application/json'

  before do
    login_as(login_user)
  end

  get '/key_results/comment_labels' do
    example 'SUCCESS: '
    example 'ERROR: '
  end
end

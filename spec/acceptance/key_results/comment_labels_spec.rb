# frozen_string_literal: true
require "rspec_api_documentation/dsl"
require_relative '../concerns/organization_dataset'

RSpec.resource 'GET /key_results/comment_labels', warden: true do
  explanation 'key_results#comment_labels'

  include OrganizationDataset

  header 'Content-Type', 'application/json'
  header 'Accept', 'application/json'

  before do
    login_as(login_user)
  end

  get '/key_results/comment_labels' do
  end
end

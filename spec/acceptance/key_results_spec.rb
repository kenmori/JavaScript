# frozen_string_literal: true
require "rspec_api_documentation/dsl"

RSpec.resource 'key_results', warden: true do
  header 'Content-Type', 'application/json'
  header 'Accept', 'application/json'

  before do
    # TODO user を作る
    # login_as(user)
  end

  #index
  get '/key_results' do
    parameter :user_id, '同じOrganizationのユーザーなら情報を取得できる', type: :integer, required: true
    parameter :okr_period_id, '必要なOKR期間を指定する', type: :integer, required: true

    # let(:user_id) {  }
    # let(:okr_period_id) {  }

    example '[SUCCESS]' do
      puts 'a' * 30
      pp Organization.all
      pp User.all
      puts 'a' * 30

      # explanation ''

      # do_request(
      #   user_id: 1,
      #   okr_period_id: 1
      # )

      # expect(status).to eq(200)
      # expect(response_body).to eq(expected_response)
    end
  end

  #index_candidates
  get '/key_results/candidates' do
  end

  #index_unprocessed
  get '/key_results/unprocessed' do
  end

  #show_objective
  get '/key_results/:id/objective' do
  end

  #create
  post '/key_results' do
  end

  #update
  patch '/key_results/:id' do
  end

  #update_disabled
  put '/key_results/:id/disable' do
  end

  #destroy
  delete '/key_results/:id' do
  end

  #update_processed
  put '/key_results/:id/process' do
  end

  #comment_labels
  get '/key_results/comment_labels' do
  end
end

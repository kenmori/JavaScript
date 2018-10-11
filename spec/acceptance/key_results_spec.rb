# frozen_string_literal: true
require "rspec_api_documentation/dsl"

RSpec.resource 'key_results', warden: true do
  let!(:organization) { OrganizationFactory.new.create }
  let!(:admin_user) { UserFactory.new(organization: organization).create(admin: true) }
  let!(:okr_period) { OkrPeriodFactory.new(organization: organization).create }
  let!(:objective) { ObjectiveFactory.new(user: admin_user, okr_period: okr_period).create }
  let!(:key_result) { KeyResultFactory.new(user: admin_user, objective: objective).create }

  let!(:login_user) { UserFactory.new(organization: organization).create(email: 'user2@example.com') }

  before do
    login_as(login_user)
  end

  #index
  get '/key_results' do
    parameter :user_id, 'サインインユーザと同じ組織のユーザーID', type: :integer, required: true
    parameter :okr_period_id, '取得したいOKR期間のID', type: :integer, required: true

    example '[SUCCESS] get the key result list' do
      explanation '同じ組織のユーザ、OKR期間のKeyResult一覧を取得する'

      do_request(
        user_id: admin_user.id,
        okr_period_id: okr_period.id
      )

      expect(status).to eq(200)

      key_result_json = parse_json(response_body, "key_results/0")
      pp key_result_json
      # expect(key_result_json).to include_json(key_result.to_json)
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

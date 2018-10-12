# frozen_string_literal: true
require "rspec_api_documentation/dsl"

RSpec.resource 'key_results', warden: true do
  let!(:organization) { OrganizationFactory.new.create }
  let!(:admin_user) { UserFactory.new(organization: organization).create(admin: true) }
  let!(:okr_period) { OkrPeriodFactory.new(organization: organization).create }
  let!(:objective) { ObjectiveFactory.new(user: admin_user, okr_period: okr_period).create }
  let!(:key_result) { KeyResultFactory.new(user: admin_user, objective: objective).create }

  let!(:other_user) { UserFactory.new(organization: organization).create(email: 'other_user@example.com') }
  let!(:other_key_result) {
    KeyResultFactory.new(user: other_user, objective: objective).create(
      name: "正式版をリリースする",
      expired_date: 3.month.since
    )
  }

  let!(:login_user) { UserFactory.new(organization: organization).create(email: 'user2@example.com') }

  let!(:other_organization) { OrganizationFactory.new.create(name: 'other') }
  let!(:other_organization_user) {
    UserFactory.new(organization: other_organization).create(
      last_name: '花京院',
      first_name: '典明',
      email: 'other_organization_user@example.com',
      admin: true
    )
  }

  before do
    login_as(login_user)
  end

  #index
  get '/key_results' do
    parameter :user_id, 'サインインユーザと同じ組織のユーザーID', type: :integer
    parameter :okr_period_id, '取得したいOKR期間のID', type: :integer, required: true

    example 'SUCCESS: When specifying user_id' do
      explanation 'user_idを渡す場合、それがサインインユーザと同じ組織のユーザであれば、OKR期間のKeyResults一覧を取得することができる'

      do_request(
        user_id: admin_user.id,
        okr_period_id: okr_period.id
      )

      expect(status).to eq(200)

      key_results = parse_response_body("key_results")
      expect(key_results.size).to eq(1)
      expect(key_results.first).to include(
        "id" => a_kind_of(Integer),
        "name" => "イケてるエンジニアを採用する",
        "objective_id" => objective.id,
        "target_value" => 1.0,
        "actual_value" => 0.0,
        "value_unit" => "人",
        "expired_date" => 1.month.since.to_date.to_s,
        "progress_rate" => 0,
        "status" => "green",
        "description" => nil,
        "disabled" => false,
        "is_full" => true,
        "child_objective_ids" => [],
        "owner" => {
          "id" => a_kind_of(Integer),
          "first_name" => "太郎",
          "last_name" => "山田",
          "avatar_url" => nil,
          "disabled" => false
        },
        "members" => []
      )
    end

    example 'SUCCESS: When user_id is not specified' do
      explanation 'user_idを渡さない場合、サインインユーザのOKR期間のKeyResults一覧を取得することができる'

      do_request(
        user_id: nil,
        okr_period_id: okr_period.id
      )

      expect(status).to eq(200)

      key_results = parse_response_body("key_results")
      expect(key_results.size).to eq(2)
      expect(key_results.dig(0, "name")).to eq("イケてるエンジニアを採用する")
      expect(key_results.dig(1, "name")).to eq("正式版をリリースする")
    end

    xexample 'ERROR: When the user_id passed is an organization different from the sign-in user' do
      explanation '渡したuser_idがサインインユーザとは異なる組織である場合、403 forbiddenを返す'
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

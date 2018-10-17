# frozen_string_literal: true
require "rspec_api_documentation/dsl"
Rails.root.join('spec/acceptance/concerns').each_child {|path| require_dependency(path) }

RSpec.resource 'GET key_results', warden: true do
  explanation 'key_results#index'

  include OrganizationDataset
  include RequestHeaderJson

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
      # 後に出来たほうが先にくる
      expect(key_results.dig(0, "name")).to eq("正式版をリリースする")
      expect(key_results.dig(1, "name")).to eq("イケてるエンジニアを採用する")
    end

    example 'ERROR: When the user_id passed is an organization different from the sign-in user' do
      explanation '渡したuser_idがサインインユーザとは異なる組織である場合、403 forbiddenを返す'

      do_request(
        user_id: other_org_user.id,
        okr_period_id: okr_period.id
      )

      expect(status).to eq(403)
      expect(parse_response_body("error")).to eq("許可されていない操作です")
    end
  end
end

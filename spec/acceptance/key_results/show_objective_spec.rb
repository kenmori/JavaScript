# frozen_string_literal: true
require "rspec_api_documentation/dsl"
Rails.root.join('spec/acceptance/concerns').each_child {|path| require_dependency(path) }

RSpec.resource 'GET /key_results/:id/objective', warden: true do
  explanation 'key_results#show_objective'

  include OrganizationDataset
  include RequestHeaderJson

  header 'Content-Type', 'application/json'
  header 'Accept', 'application/json'

  before do
    login_as(login_user)
  end

  get '/key_results/:id/objective' do
    parameter :id, 'KeyResult ID', type: :integer, required: true

    example 'SUCCESS: When the Owner of KeyResult is the same organization as the sign-in user' do
      explanation 'KeyResultのOwnerがサインインユーザと同じ組織である場合、Objective一覧を取得することができる'

      do_request(id: key_result.id)

      expect(status).to eq(200)

      objective = parse_response_body("objective")
      expect(objective).to include(
        "id" => a_kind_of(Integer),
        "name" => "使いやすいサービスを作る",
        "description" => "事業を成功させるには、少なくとも競合より使いやすいサービスが欲しい。",
        "okr_period_id" =>  okr_period.id,
        "progress_rate" => 0,
        "parent_key_result_id" => nil,
        "updated_at" => be_time_iso8601,
        "key_result_order" => nil,
        "disabled" => false,
        "is_full" => true,
        "key_result_ids" => a_kind_of(Array),
        "owner" => {
          "id" => admin_user.id,
          "first_name" => "太郎",
          "last_name" => "山田",
          "avatar_url" => nil,
          "disabled" => false
        },
        "sub_progress_rate" => 0,
        "key_results" => a_kind_of(Array)
      )
      # NOTE key_results の中身は他のアクションのテストで見ているのでここでは省略する(同じ内容という保証はないけど)。
      # TODO 実装では key_results の Order が設定されていないので ID 順になるためテストしづらいので、
      # key_results index の使用に合わせるなら created_at の順番にしたほうがよい。
    end

    example 'ERROR: When the KeyResult ID does not exist', gaffe: true do
      explanation '指定したKeyResult IDが存在しない場合404 Not Foundを返す'

      do_request(id: 0)

      expect(status).to eq(404)
      expect(parse_response_body("error")).to eq("操作の対象が存在しません")
    end

    example 'ERROR: When the Organization of KeyResult to be specified is different' do
      explanation '指定したKeyResult IDの作成者の組織がサインインユーザと異なる場合、403 forbiddenを返す'

      do_request(id: other_org_key_result.id)

      expect(status).to eq(403)
      expect(parse_response_body("error")).to eq("許可されていない操作です")
    end
  end
end

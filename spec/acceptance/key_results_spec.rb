# frozen_string_literal: true
require "rspec_api_documentation/dsl"

RSpec.resource 'key_results', warden: true do
  header 'Content-Type', 'application/json'
  header 'Accept', 'application/json'

  let!(:organization) { OrganizationFactory.new.create }
  let!(:admin_user) { UserFactory.new(organization: organization).create(admin: true) }
  let!(:okr_period) { OkrPeriodFactory.new(organization: organization).create }
  let!(:objective) { ObjectiveFactory.new(user: admin_user, okr_period: okr_period).create }
  let!(:key_result) { KeyResultFactory.new(user: admin_user, objective: objective).create }

  let!(:other_user) {
    UserFactory.new(organization: organization).create(
      email: 'other_user@example.com',
      first_name: '園田',
      last_name: '次郎'
    )
  }
  let!(:other_key_result) {
    travel_to(1.second.since) do
      KeyResultFactory.new(user: other_user, objective: objective).create(
        name: "正式版をリリースする",
        expired_date: 3.month.since
      )
    end
  }

  let!(:login_user) {
    UserFactory.new(organization: organization).create(
      email: 'user2@example.com',
      first_name: 'ログイン',
      last_name: 'したろう'
    )
  }

  let!(:other_org) { OrganizationFactory.new.create(name: 'other') }
  let!(:other_org_user) {
    UserFactory.new(organization: other_org).create(
      last_name: '花京院',
      first_name: '典明',
      email: 'other_org_user@example.com',
      admin: true
    )
  }
  let!(:other_org_okr_period) {
    OkrPeriodFactory.new(
      organization: other_org,
    ).create(
      name: "第3部"
    )
  }
  let!(:other_org_objective) {
    ObjectiveFactory.new(
      user: other_org_user,
      okr_period: other_org_okr_period
    ).create(
      name: "DIOを倒す"
    )
  }
  let!(:other_org_key_result) {
    KeyResultFactory.new(
      user: other_org_user,
      objective: other_org_objective
    ).create(
      name: "エジプトに行く"
    )
  }

  before do
    login_as(login_user)
  end

  #index
  get '/key_results' do
    parameter :user_id, 'サインインユーザと同じ組織のユーザーID', type: :integer
    parameter :okr_period_id, '取得したいOKR期間のID', type: :integer, required: true

    example '[index] SUCCESS: When specifying user_id' do
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

    example '[index] SUCCESS: When user_id is not specified' do
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

    example '[index] ERROR: When the user_id passed is an organization different from the sign-in user' do
      explanation '渡したuser_idがサインインユーザとは異なる組織である場合、403 forbiddenを返す'

      do_request(
        user_id: other_org_user.id,
        okr_period_id: okr_period.id
      )

      expect(status).to eq(403)
      expect(parse_response_body("error")).to eq("許可されていない操作です")
    end
  end

  #index_candidates
  get '/key_results/candidates' do
    parameter :user_id, 'サインインユーザと同じ組織のユーザーID', type: :integer
    parameter :okr_period_id, '取得したいOKR期間のID', type: :integer, required: true

    example '[index_candidates] SUCCESS: When specifying user_id' do
      explanation 'user_idを渡す場合、それがサインインユーザと同じ組織のユーザであれば、OKR期間のKeyResults一覧の概要を取得することができる'

      do_request(
        user_id: admin_user.id,
        okr_period_id: okr_period.id
      )

      expect(status).to eq(200)

      key_results = parse_response_body
      expect(key_results.size).to eq(1)
      expect(key_results.first).to include(
        "id" => a_kind_of(Integer),
        "name" => "イケてるエンジニアを採用する",
        "progress_rate" => 0,
        "status" => "green",
        "disabled" => false,
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

    example '[index_candidates] SUCCESS: When user_id is not specified' do
      explanation 'user_idを渡さない場合、サインインユーザのOKR期間のKeyResults一覧の概要を取得することができる'

      do_request(
        user_id: nil,
        okr_period_id: okr_period.id
      )

      expect(status).to eq(200)

      key_results = parse_response_body
      expect(key_results.size).to eq(2)
      # 後に出来たほうが先にくる
      expect(key_results.dig(0, "name")).to eq("正式版をリリースする")
      expect(key_results.dig(1, "name")).to eq("イケてるエンジニアを採用する")
    end

    example '[index_candidates] ERROR: When the user_id passed is an organization different from the sign-in user' do
      explanation '渡したuser_idがサインインユーザとは異なる組織である場合、403 forbiddenを返す'

      do_request(
        user_id: other_org_user.id,
        okr_period_id: okr_period.id
      )

      expect(status).to eq(403)
      expect(parse_response_body("error")).to eq("許可されていない操作です")
    end
  end

  #index_unprocessed
  get '/key_results/unprocessed' do
    parameter :user_id, 'サインインユーザと同じ組織のユーザーID', type: :integer, required: true
    parameter :okr_period_id, '取得したいOKR期間のID', type: :integer, required: true

    example '[index_unprocessed] SUCCESS: When specifying a user with KeyResults that have not started' do
      explanation <<~EOF
        user_idがサインインユーザと同じ組織のユーザであれば、そのユーザが着手していないKeyResults一覧を取得することができる。
        Objectiveのownerが作成したKeyResultは自動的にownerであるユーザが着手していることになる。
      EOF

      do_request(
        user_id: other_user.id,
        okr_period_id: okr_period.id
      )

      expect(status).to eq(200)

      key_results = parse_response_body("key_results")
      expect(key_results.size).to eq(1)
      expect(key_results.first).to include(
        "id" => a_kind_of(Integer),
        "name" => "正式版をリリースする",
        "objective_id" => objective.id,
        "target_value" => 1.0,
        "actual_value" => 0.0,
        "value_unit" => "人",
        "expired_date" => 3.month.since.to_date.to_s,
        "progress_rate" => 0,
        "status" => "green",
        "description" => nil,
        "disabled" => false,
        "is_full" => true,
        "child_objective_ids" => [],
        "owner" =>
        {"id" => a_kind_of(Integer),
          "first_name" => "園田",
          "last_name" => "次郎",
          "avatar_url" => nil,
          "disabled" => false},
        "members" => []
      )
    end

    example "[index_unprocessed] SUCCESS: When specifying Objective's Owner" do
      explanation <<~EOF
        user_idがサインインユーザと同じ組織のユーザであれば、そのユーザが着手していないKeyResults一覧を取得することができる。
        Objectiveのownerが作成したKeyResultは自動的にownerであるユーザが着手していることになる。
        そのため、ownerを指定する場合はKeyResultsを取得することが出来ない。
      EOF

      do_request(
        user_id: admin_user.id,
        okr_period_id: okr_period.id
      )

      expect(status).to eq(200)

      expect(parse_response_body).to include(
        "key_results" => []
      )
    end

    example '[index_unprocessed] ERROR: When the user_id passed is an organization different from the sign-in user' do
      explanation '渡したuser_idがサインインユーザとは異なる組織である場合、403 forbiddenを返す'

      do_request(
        user_id: other_org_user.id,
        okr_period_id: okr_period.id
      )

      expect(status).to eq(403)
      expect(parse_response_body("error")).to eq("許可されていない操作です")
    end
  end

  #show_objective
  get '/key_results/:id/objective' do
    parameter :id, 'KeyResult ID', type: :integer, required: true

    example '[show_objective] SUCCESS: When the Owner of KeyResult is the same organization as the sign-in user' do
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

    example '[show_objective] ERROR: When the KeyResult ID does not exist', gaffe: true do
      explanation '指定したKeyResult IDが存在しない場合404 Not Foundを返す'

      do_request(id: 0)

      expect(status).to eq(404)
      expect(parse_response_body("error")).to eq("操作の対象が存在しません")
    end

    example '[show_objective] ERROR: When the Organization of KeyResult to be specified is different' do
      explanation '指定したKeyResult IDの作成者の組織がサインインユーザと異なる場合、403 forbiddenを返す'

      do_request(id: other_org_key_result.id)

      expect(status).to eq(403)
      expect(parse_response_body("error")).to eq("許可されていない操作です")
    end
  end

  #create
  post '/key_results' do
    before do
      login_as(admin_user)
    end

    with_options scope: :key_result do
      parameter :owner_id, '作成者とするユーザのID', type: :integer, required: true
      parameter :objective_id, '親となるObjectiveのID', type: :integer, required: true
      parameter :name, 'KeyResultのタイトル', type: :string, required: true
      parameter :expired_date, '期限(YYYY-MM-DD)', type: :string, required: true
      parameter :description, '説明文', type: :string
      parameter :target_value, '目標値', type: :number
      parameter :value_unit, '目標値の単位', type: :string
      parameter :members, '関係者とするUser ID', type: :array
    end

    example '[create] SUCCESS: create a new KeyResult' do
      explanation '新しいKeyResultを作成する'

      expired_date = 3.month.since.to_date.to_s

      do_request(
        key_result: {
          owner_id: admin_user.id,
          objective_id: objective.id,
          name: '月間アクセスを増やす',
          expired_date: expired_date,
          description: '使いやすくしてアクセス数を増やす',
          target_value: '10000',
          value_unit: 'アクセス/月',
          members: [other_user.id, login_user.id],
        }
      )

      expect(status).to eq(201)
      expect(parse_response_body("key_result")).to include(
        "id" => a_kind_of(Integer),
        "name" => "月間アクセスを増やす",
        "objective_id" => objective.id,
        "target_value" => 10000.0,
        "actual_value" => nil,
        "value_unit" => "アクセス/月",
        "expired_date" => expired_date,
        "progress_rate" => 0,
        "status" => "green",
        "description" => "使いやすくしてアクセス数を増やす",
        "disabled" => false,
        "is_full" => true,
        "child_objective_ids" => [],
        "owner" => {
          "id" => admin_user.id,
          "first_name" => "太郎",
          "last_name" => "山田",
          "avatar_url" => nil,
          "disabled" => false
        },
        "members" => [
          {
            "id" => other_user.id,
            "first_name" => "園田",
            "last_name" => "次郎",
            "avatar_url" => nil,
            "disabled" => false
          },
          {
            "id" => login_user.id,
            "first_name" => "ログイン",
            "last_name" => "したろう",
            "avatar_url" => nil,
            "disabled" => false
          }
        ],
        "result" => nil,
        "is_processed" => true,
        "achievement_rate" => nil,
        "objective"=>{
          "id" => objective.id,
          "name" => "使いやすいサービスを作る",
          "description" => "事業を成功させるには、少なくとも競合より使いやすいサービスが欲しい。",
          "okr_period_id" => okr_period.id,
          "progress_rate" => 0,
          "parent_key_result_id" => nil,
          "updated_at" => be_time_iso8601,
          "key_result_order" => nil,
          "disabled" => false,
          "is_full" => true,
          "key_result_ids" => all(a_kind_of(Integer)),
          "owner" => {
            "id" => admin_user.id,
            "first_name" => "太郎",
            "last_name" => "山田",
            "avatar_url" => nil,
            "disabled" => false
          },
          "sub_progress_rate" => 0,
          "connected_key_results" => []
        },
        "comments" => []
      )
    end

    example '[create] ERROR: owner_id が admin でも、 objective_id で指定した Objective の owner では無い時'
    example '[create] ERROR: owner_idとobjective_id以外の必須項目を入力していない時'
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

RSpec.describe User::Create do
  include DepartmentDataset

  before do
    admin_user
    dep_1
  end

  example "SUCCESS: ユーザーを登録する" do
    params = {
      first_name: "Q太郎",
      last_name: "空条",
      email: "kujo-q@example.com",
      admin: false,
      skip_notification: false,
      department_ids: [dep_1.id]
    }
    result = described_class.call(params: params, current_user: admin_user)
    user = result[:model]

    expect(result).to be_success
    expect(user.first_name).to eq("Q太郎")
    expect(user.last_name).to eq("空条")
    expect(user.email).to eq("kujo-q@example.com")
    expect(user.admin?).to be(false)
    expect(user.departments).to contain_exactly(dep_1)
    expect(user.organization).to eq(organization)
  end

  example "ERROR: 必須項目を入力しない場合" do
    params = {
      first_name: nil,
      last_name: nil,
      email: nil,
      admin: nil,
      skip_notification: nil,
      department_ids: [nil],
    }

    result = described_class.call(params: params, current_user: admin_user)
    contract = result["contract.default"]

    expect(result).to be_failure
    expect(contract.errors.full_messages).to contain_exactly(
      "メールアドレスを入力してください",
      "ユーザ名(名)を入力してください",
      "ユーザ名(姓)を入力してください",
      "管理者フラグは一覧にありません",
      "メール認証スキップは一覧にありません",
      "部署IDを入力してください"
    )
  end

  example "ERROR: 別の組織の部署を指定することは出来ない" do
    dep_2

    params = {
      first_name: "Q太郎",
      last_name: "空条",
      email: "kujo-q@example.com",
      admin: false,
      skip_notification: false,
      department_ids: [dep_1.id, dep_2.id]
    }
    result = described_class.call(params: params, current_user: admin_user)
    contract = result["contract.default"]

    expect(result).to be_failure
    expect(contract.errors.full_messages).to contain_exactly("部署IDは組織内から選択してください")
  end

  example "ERROR: current_userは管理者でなければならない" do
    params = {
      first_name: "Q太郎",
      last_name: "空条",
      email: "kujo-q@example.com",
      admin: false,
      skip_notification: false,
      department_ids: [dep_1.id]
    }
    result = described_class.call(params: params, current_user: nomal_user)

    expect(result["result.policy.default"]).to be_failure
  end
end

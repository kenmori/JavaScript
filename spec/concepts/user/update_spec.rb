# frozen_string_literal: true

RSpec.describe User::Update do
  include DepartmentDataset

  before do
    dep_1
    nomal_user.department_members.create!(department: dep_1, role: :member)
  end

  describe "SUCCESS" do
    example "update first_name" do
      params = {
        id: nomal_user.id,
        first_name: "Q太郎"
      }

      result = described_class.call(params: params, current_user: admin_user)

      expect(result).to be_success
      nomal_user.reload
      expect(nomal_user.first_name).to eq("Q太郎")

      # 部署を消さないこと
      expect(nomal_user.departments).to contain_exactly(dep_1)
    end

    example "update last_name" do
      params = {
        id: nomal_user.id,
        last_name: "空条"
      }

      result = described_class.call(params: params, current_user: admin_user)

      expect(result).to be_success
      nomal_user.reload
      expect(nomal_user.last_name).to eq("空条")
    end

    example "update email" do
      params = {
        id: nomal_user.id,
        email: "changed@example.com"
      }

      result = described_class.call(params: params, current_user: admin_user)

      expect(result).to be_success
      nomal_user.reload
      expect(nomal_user.unconfirmed_email).to eq("changed@example.com")
    end

    # FIXME: Circle CI で落ちるので xexample にしています
    xexample "change avatar image" do
      params = {
        id: nomal_user.id,
        avatar: Rack::Test::UploadedFile.new(fixture_path.join("images/user.jpg"), "image/jpeg")
      }

      result = described_class.call(params: params, current_user: admin_user)

      expect(result).to be_success
      nomal_user.reload
      expect(nomal_user.avatar).to be_a_kind_of(AvatarUploader)
      expect(nomal_user.avatar.content_type).to eq("image/jpg")
    end

    example "update admin flag" do
      params = {
        id: nomal_user.id,
        admin: true
      }

      result = described_class.call(params: params, current_user: admin_user)

      expect(result).to be_success
      nomal_user.reload
      expect(nomal_user).to be_admin
    end

    example "update departments" do
      params = {
        id: nomal_user.id,
        department_ids: [dep_1_1.id]
      }

      result = described_class.call(params: params, current_user: admin_user)

      expect(result).to be_success
      nomal_user.reload
      expect(nomal_user.departments).to contain_exactly(dep_1_1)
    end

    example "update multiple departments" do
      params = {
        id: nomal_user.id,
        department_ids: [dep_1.id, dep_1_1.id]
      }

      result = described_class.call(params: params, current_user: admin_user)

      expect(result).to be_success
      nomal_user.reload
      expect(nomal_user.departments).to contain_exactly(dep_1, dep_1_1)
    end
  end

  describe "ERROR" do
    example "必須項目を削除するケース" do
      params = {
        id: nomal_user.id,
        first_name: nil,
        last_name: nil,
        email: nil,
        admin: nil,
        department_ids: []
      }

      result = described_class.call(params: params, current_user: admin_user)
      contract = result["contract.default"]

      expect(result).to be_failure
      expect(contract.errors.full_messages).to contain_exactly(
        "メールアドレスを入力してください",
        "ユーザー名 (名) を入力してください",
        "ユーザー名 (姓) を入力してください",
        "管理者フラグは一覧にありません",
        "部署IDを入力してください"
      )
    end

    example "ERROR: 別の組織の部署を指定することは出来ない" do
      dep_2

      params = {
        id: nomal_user.id,
        department_ids: [dep_1.id, dep_2.id]
      }
      result = described_class.call(params: params, current_user: admin_user)
      contract = result["contract.default"]

      expect(result).to be_failure
      expect(contract.errors.full_messages).to contain_exactly("部署IDは組織内から選択してください")
    end
  end
end
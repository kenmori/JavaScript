# frozen_string_literal: true

RSpec.describe KeyResult::History do
  include OrganizationDataset

  let(:target) { KeyResultFactory.new(user: admin_user, objective: objective).create }

  before do
    target.update!(name: "[UPDATED-1] KeyResult")
    travel 1.day
    target.update!(name: "[UPDATED-2] KeyResult")
    travel_back
  end

  example "SUCCESS: 降順で変更履歴が取得出来る" do
    result = described_class.call(params: { id: target.id }, current_user: admin_user)

    histories = result[:histories]
    expect(result).to be_success
    expect(histories).to eq target.versions.reverse
  end
end
# frozen_string_literal: true

RSpec.describe Objective::History do
  include OrganizationDataset

  let(:target) { ObjectiveFactory.new(user: admin_user, okr_period: okr_period).create }

  before do
    target.update!(name: "[UPDATED-1] Objective")
    target.update!(name: "[UPDATED-2] Objective")
  end

  example "SUCCESS: 降順で変更履歴が取得出来る" do
    result = described_class.call(params: { id: target.id }, current_user: admin_user)

    histories = result[:histories]
    expect(result).to be_success
    expect(histories).to eq target.versions.reverse
  end
end

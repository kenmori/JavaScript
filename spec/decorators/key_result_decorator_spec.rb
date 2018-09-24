# frozen_string_literal: true

require "spec_helper"

describe KeyResultDecorator do
  subject { key_result }

  let(:key_result) { KeyResult.new.extend described_class }

  it { is_expected.to be_a KeyResult }
end

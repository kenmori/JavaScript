# frozen_string_literal: true

require "spec_helper"

describe OkrPeriodDecorator do
  subject { okr_period }

  let(:okr_period) { OkrPeriod.new.extend described_class }

  it { is_expected.to be_a OkrPeriod }
end

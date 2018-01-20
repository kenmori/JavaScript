require 'spec_helper'

describe OkrPeriodDecorator do
  let(:okr_period) { OkrPeriod.new.extend OkrPeriodDecorator }
  subject { okr_period }
  it { should be_a OkrPeriod }
end

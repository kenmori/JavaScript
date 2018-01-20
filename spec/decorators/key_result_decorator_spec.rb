require 'spec_helper'

describe KeyResultDecorator do
  let(:key_result) { KeyResult.new.extend KeyResultDecorator }
  subject { key_result }
  it { should be_a KeyResult }
end

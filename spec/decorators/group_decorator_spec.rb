require 'spec_helper'

describe GroupDecorator do
  let(:group) { Group.new.extend GroupDecorator }
  subject { group }
  it { should be_a Group }
end

require 'spec_helper'

describe ObjectiveMemberDecorator do
  let(:objective_member) { ObjectiveMember.new.extend ObjectiveMemberDecorator }
  subject { objective_member }
  it { should be_a ObjectiveMember }
end

require 'spec_helper'

describe KeyResultMemberDecorator do
  let(:key_result_member) { KeyResultMember.new.extend KeyResultMemberDecorator }
  subject { key_result_member }
  it { should be_a KeyResultMember }
end

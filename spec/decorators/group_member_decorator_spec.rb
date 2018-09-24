require 'spec_helper'

describe GroupMemberDecorator do
  let(:group_member) { GroupMember.new.extend GroupMemberDecorator }
  subject { group_member }
  it { should be_a GroupMember }
end

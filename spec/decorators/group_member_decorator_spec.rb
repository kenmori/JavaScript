# frozen_string_literal: true

require "spec_helper"

describe GroupMemberDecorator do
  subject { group_member }

  let(:group_member) { GroupMember.new.extend described_class }

  it { is_expected.to be_a GroupMember }
end

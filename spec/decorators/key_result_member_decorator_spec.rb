# frozen_string_literal: true

require "spec_helper"

describe KeyResultMemberDecorator do
  subject { key_result_member }

  let(:key_result_member) { KeyResultMember.new.extend described_class }

  it { is_expected.to be_a KeyResultMember }
end

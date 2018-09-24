# frozen_string_literal: true

require "spec_helper"

describe ObjectiveMemberDecorator do
  subject { objective_member }

  let(:objective_member) { ObjectiveMember.new.extend described_class }

  it { is_expected.to be_a ObjectiveMember }
end

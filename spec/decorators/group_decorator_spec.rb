# frozen_string_literal: true

require "spec_helper"

describe GroupDecorator do
  subject { group }

  let(:group) { Group.new.extend described_class }

  it { is_expected.to be_a Group }
end

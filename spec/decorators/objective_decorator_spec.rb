# frozen_string_literal: true

require "spec_helper"

describe ObjectiveDecorator do
  subject { objective }

  let(:objective) { Objective.new.extend described_class }

  it { is_expected.to be_a Objective }
end

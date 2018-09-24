require 'spec_helper'

describe ObjectiveDecorator do
  let(:objective) { Objective.new.extend ObjectiveDecorator }
  subject { objective }
  it { should be_a Objective }
end

# frozen_string_literal: true

require "spec_helper"

describe CommentDecorator do
  subject { comment }

  let(:comment) { Comment.new.extend described_class }

  it { is_expected.to be_a Comment }
end

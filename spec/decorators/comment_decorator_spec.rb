require 'spec_helper'

describe CommentDecorator do
  let(:comment) { Comment.new.extend CommentDecorator }
  subject { comment }
  it { should be_a Comment }
end

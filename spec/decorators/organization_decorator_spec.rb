require 'spec_helper'

describe OrganizationDecorator do
  let(:organization) { Organization.new.extend OrganizationDecorator }
  subject { organization }
  it { should be_a Organization }
end

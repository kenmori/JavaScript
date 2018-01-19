require 'spec_helper'

describe OrganizationMemberDecorator do
  let(:organization_member) { OrganizationMember.new.extend OrganizationMemberDecorator }
  subject { organization_member }
  it { should be_a OrganizationMember }
end

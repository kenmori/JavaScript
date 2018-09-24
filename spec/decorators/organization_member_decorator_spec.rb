# frozen_string_literal: true

require "spec_helper"

describe OrganizationMemberDecorator do
  subject { organization_member }

  let(:organization_member) { OrganizationMember.new.extend described_class }

  it { is_expected.to be_a OrganizationMember }
end

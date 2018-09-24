# frozen_string_literal: true

require "spec_helper"

describe OrganizationDecorator do
  subject { organization }

  let(:organization) { Organization.new.extend described_class }

  it { is_expected.to be_a Organization }
end

# frozen_string_literal: true

require_relative "abstract_active_record_factory"

class OrganizationMemberFactory < AbstractActiveRecordFactory
  def initialize(organization:, user:)
    super(OrganizationMember.new)
    @organization = organization
    @user = user
  end
  attr_reader :organization, :user

  private

    def default_params
      {
        organization: organization,
        user: user,
        role: :member
      }
    end
end

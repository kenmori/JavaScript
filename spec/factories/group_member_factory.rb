# frozen_string_literal: true

require_relative "abstract_active_record_factory"

class GroupMemberFactory < AbstractActiveRecordFactory
  def initialize(user:, group:)
    super(GroupMember.new)
    @user = user
    @group = group
  end
  attr_reader :user, :group

  private

    def default_params
      {
        user: user,
        group: group,
        role: :member
      }
    end
end

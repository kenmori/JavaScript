# frozen_string_literal: true

require_relative "abstract_factory"

class GroupMemberFactory < AbstractFactory
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

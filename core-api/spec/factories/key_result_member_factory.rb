# frozen_string_literal: true

require_relative "abstract_active_record_factory"

class KeyResultMemberFactory < AbstractActiveRecordFactory
  def initialize(user:, key_result:)
    super(KeyResultMember.new)
    @user = user
    @key_result = key_result
  end
  attr_reader :user, :key_result

  private

    def default_params
      {
        key_result: key_result,
        user: user,
        role: :member
      }
    end
end

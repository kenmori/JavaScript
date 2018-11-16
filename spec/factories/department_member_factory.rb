# frozen_string_literal: true

require_relative "abstract_active_record_factory"

class DepartmentMemberFactory < AbstractActiveRecordFactory
  def initialize(department:, user:)
    super(DepartmentMember.new)
    @department = department
    @user = user
  end
  attr_reader :department, :user

  private

    def default_params
      {
        department_id: department.id,
        user_id: user.id,
        role: :member
      }
    end
end

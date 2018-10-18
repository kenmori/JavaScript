# frozen_string_literal: true

require_relative "abstract_factory"

class KeyResultFactory < AbstractFactory
  def initialize(user:, objective:)
    super(KeyResult.new)
    @user = user
    @objective = objective
  end
  attr_reader :user, :objective

  def create(**params)
    super.tap  do
      KeyResultMember.create!(
        key_result: model,
        user: user,
        role: :owner
      )
    end
  end

  private

    def default_params
      {
        objective: objective,
        name: "イケてるエンジニアを採用する",
        target_value: 1,
        actual_value: 0,
        value_unit: "人",
        expired_date: 1.month.since
      }
    end
end

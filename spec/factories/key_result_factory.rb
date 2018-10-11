require_relative 'abstract_factory'

class KeyResultFactory < AbstractFactory
  def initialize(user:, objective:)
    super(KeyResult.new)
    @user = user
    @objective = objective
  end
  attr_reader :user, :objective

  private

  def default_params
    {
      user: user,
      objective: objective,
      name: "イケてるエンジニアを採用する",
      target_value: 1,
      actual_value: 0,
      value_unit: "人",
      expired_date: 1.month.since
    }
  end
end

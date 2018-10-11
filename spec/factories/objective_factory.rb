require_relative 'abstract_factory'

class ObjectiveFactory < AbstractFactory
  def initialize(user:, okr_period:)
    super(Objective.new)
    @user = user
    @okr_period = okr_period
  end
  attr_reader :user, :okr_period

  private

  def default_params
    {
      user: user,
      okr_period: okr_period,
      name: "使いやすいサービスを作る",
      description: "事業を成功させるには、少なくとも競合より使いやすいサービスが欲しい。",
    }
  end
end

# frozen_string_literal: true

require_relative "abstract_active_record_factory"

class ObjectiveFactory < AbstractActiveRecordFactory
  def initialize(user:, okr_period:)
    super(Objective.new)
    @user = user
    @okr_period = okr_period
  end
  attr_reader :user
  attr_reader :okr_period

  def create(**params)
    super.tap do
      ObjectiveMember.create!(
        objective: model,
        user: user,
        role: :owner
      )
    end
  end

  private

    def default_params
      {
        okr_period: @okr_period,
        name: "使いやすいサービスを作る",
        description: "事業を成功させるには、少なくとも競合より使いやすいサービスが欲しい。"
      }
    end
end
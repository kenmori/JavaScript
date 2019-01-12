# frozen_string_literal: true

class AbstractActiveRecordFactory
  def initialize(model)
    @model = model
  end

  attr_reader :model

  def create(**params)
    @model.attributes = default_params.merge(params)
    @model.save!
    @model
  end

  private

    def default_params
      raise NotImplementedError
    end
end

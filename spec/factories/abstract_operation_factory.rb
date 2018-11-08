class AbstractOperationFactory
  def initialize(operation_klass)
    @operation_klass = operation_klass
  end

  def create(**params)
    @result = @operation_klass.call(params: default_params.merge(params))
    model
  end

  def model
    return unless @result
    @result[:model]
  end

  private

  def default_params
    raise NotImplementedError
  end
end

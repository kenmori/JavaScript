require_relative 'abstract_factory'

class OrganizationFactory < AbstractFactory
  def initialize
    super(Organization.new)
  end

  private

  def default_params
    {
      name: "Test"
    }
  end
end

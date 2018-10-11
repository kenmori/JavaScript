require_relative 'abstract_factory'

class GroupFactory < AbstractFactory
  def initialize(organization:)
    super(Group.new)
    @organization = organization
  end
  attr_reader :organization

  private

  def default_params
    {
      organization: organization,
      name: '開発部'
    }
  end
end

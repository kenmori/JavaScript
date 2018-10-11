require_relative 'abstract_factory'

class UserFactory < AbstractFactory
  def initialize(organization:)
    super(User.new)
    @organization = organization
  end
  attr_reader :organization

  private

  def default_params
    {
      organization: organization,
      last_name: "山田",
      first_name: "太郎",
      email: "yamada@example.com",
      password: "Pass0123",
      admin: true,
      confirmed_at: 1.week.ago
    }
  end
end

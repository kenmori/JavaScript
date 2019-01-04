# frozen_string_literal: true

require_relative "abstract_active_record_factory"

# TODO User::Createを使う形で作り直す。Organization作成時にdefault部署を作る対応をした後の方がよさそう
class UserFactory < AbstractActiveRecordFactory
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
        admin: false,
        confirmed_at: 1.week.ago
      }
    end
end

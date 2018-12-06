# frozen_string_literal: true

class User::Show < Trailblazer::Operation
  class Form < Reform::Form
    property :id, writeable: false
    property :organization_id, writeable: false, virtual: true

    include UserValidation.new(:default)
    validates :id, VH[:required, :natural_number]
    validates :organization_id, VH[:required, :natural_number]
    validate -> {
      unless OrganizationMember.exists?(organization_id: organization_id, user_id: id)
        errors.add(:id, :not_found)
      end
    }
  end

  step Model(User, :find_by)
  failure :abort!
  step Contract::Build(constant: Form)
  step Contract::Validate()

  private

    # NOTE: find_byで失敗時に実行する
    # modelがnilのため新しいUserインスタンスを生成
    def abort!(options, **)
      options["contract.default"] = User.new
      options["contract.default"].errors.add(:id, :not_found)
    end
end

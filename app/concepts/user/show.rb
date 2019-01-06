# frozen_string_literal: true

class User::Show < Trailblazer::Operation
  class Form < Reform::Form
    property :id, writeable: false
    property :organization_id, writeable: false, virtual: true

    validates :id, VH[:required, :natural_number]
    validates :organization_id, VH[:required, :natural_number]
  end

  step Model(User, :find_by)
  step Policy::Pundit(UserPolicy, :show?)
  step Contract::Build(constant: Form)
  step Contract::Validate()
end

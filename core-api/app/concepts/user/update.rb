# frozen_string_literal: true

class User::Update < Trailblazer::Operation
  class Form < Reform::Form
    property :id
    property :first_name
    property :last_name
    property :email
    property :avatar
    property :admin
    property :department_ids, virtual: true
    property :current_user, virtual: true

    include UserValidation.new(:default, :department_ids)
  end

  step Model(User, :find_by)
  step Policy::Pundit(UserPolicy, :update?)
  step Contract::Build(constant: Form, builder: ContractWithCurrentUser)
  step Contract::Validate()
  step Contract::Persist(method: :sync)
  step :update

  def update(_options, model:, params:, current_user:, **)
    ApplicationRecord.transaction do
      model.save(validate: false)

      # 部署の更新
      if params[:department_ids].present?
        model.department_members.destroy_all
        (params[:department_ids] || []).each do |department_id|
          # NOTE 指定された部署IDが同じ部署かどうかはバリデーションで担保している
          model.department_members.create!(department_id: department_id, role: :member)
        end
      end

      true
    end
  end
end

class User::Update < Trailblazer::Operation
  class Form < Reform::Form
    property :id
    property :first_name
    property :last_name
    property :email
    property :avatar
    property :admin
    property :department_ids, virtual: true
  end

  step Model(User, :find_by)
  step Policy::Pundit(UserPolicy, :update?)
  step Contract::Build(constant: Form, builder: :contract_with_current_user!)
  step Contract::Validate()
  step Contract::Persist(method: :sync)
  step :update

  def update(_options, model:, params:, current_user:, **)
    ApplicationRecord.transaction do
      model.save(validate: false)

      departments = current_user.organization.departments.where(id: params[:department_ids])
      departments.each do |department|
        model.department_members.create!(department: department, role: :member)
      end
    end
  end

  def contract_with_current_user!(_options, constant:, model:, current_user:, **)
    constant.new(model, current_user: current_user)
  end
end

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

      current_department_ids = model.department_members.pluck(:department_id)
      Department.where(
        organization: current_user.organization,
        id: (params[:department_ids] || []) - current_department_ids
      ).each do |department|
        model.department_members.create!(department: department, role: :member)
      end
    end
  end
end

class User::Create < Trailblazer::Operation
  class Form < Reform::Form
    property :first_name
    property :last_name
    property :email
    property :admin
    property :skip_notification
    property :department_ids, virtual: true
  end

  step Model(User, :new)
  step Contract::Build(constant: Form)
  # step Contract::Validate()
  step Contract::Persist(method: :sync)
  step ->(_options, model:, params:, **) {
    model.valid?
  }
  step :create

  def create(_options, model:, params:, **)
    ApplicationRecord.transaction do
      user = current_organization.users.create!(create_user_params)

      departments = current_organization.departments.where(id: params[:user].fetch(:department_ids))
      if departments.empty?
        current_organization.departments.raise_record_not_found_exception!([])
      else
        departments.each do |department_id|
          department = current_organization.departments.find(department_id)
          user.department_members.create!(department: department, role: :member)
        end
      end
    end

    true
  end
end

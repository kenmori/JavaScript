class User::Create < Trailblazer::Operation
  class Form < Reform::Form
    property :first_name
    property :last_name
    property :email
    property :admin
    property :skip_notification
    property :department_ids, virtual: true

    validates :department_ids, VH[:required]
    # 配列の要素が存在すること
    # 配列の要素が current_organization の部署であること
    # 他にも Validation が必要なはず
  end

  step Model(User, :new)
  step Contract::Build(constant: Form)
  step Contract::Persist(method: :sync)
  step :run_model_validation
  step Contract::Validate()
  step :create

  def run_model_validation(options, model:, params:, **)
    if model.invalid?
      model.errors.each do |key, msg|
        options["contract.default"].errors.add(key, msg)
      end
      false
    else
      true
    end
  end

  def create(_options, model:, params:, **)
    # TODO Userモデルでやってるコールバック処理をどうするか
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

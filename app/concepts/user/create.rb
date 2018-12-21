class User::Create < Trailblazer::Operation
  class Form < Reform::Form
    property :first_name
    property :last_name
    property :email
    property :admin
    property :skip_notification
    property :department_ids, virtual: true
    property :current_user, virtual: true

    validates :email, VH[:required, :email]
    validates_uniqueness_of :email
    validates :first_name, VH[:required, :middle_text_field]
    validates :last_name, VH[:required, :middle_text_field]
    validates :admin, VH[:boolean]
    validates :skip_notification, VH[:boolean]
    validates :department_ids, VH[:required]
    validate -> {
      if department_ids.all?(&:nil?)
        errors.add(:department_ids, :blank)
      end
    }
    validate -> {
      departments = Department.where(id: department_ids)
      unless departments.all? {|d| d.organization == current_user.organization }
        errors.add(:department_ids, :must_be_same_organization)
      end
    }
    # 他にも Validation が必要なはず
  end

  step Model(User, :new)
  # step Policy::Pundit(UserPolicy, :create?)
  step Contract::Build(constant: Form, builder: :default_contract!)
  def default_contract!(_options, constant:, model:, current_user:, **)
    constant.new(model, current_user: current_user)
  end

  step Contract::Validate()
  step Contract::Persist(method: :sync)
  step :create

  def create(_options, model:, params:, current_user:, **)
    current_organization = current_user.organization

    # TODO Userモデルでやってるコールバック処理をどうするか
    ApplicationRecord.transaction do
      model.save(validate: false)

      departments = current_organization.departments.where(id: params[:department_ids])
      departments.each do |department|
        model.department_members.create!(department: department, role: :member)
      end
    end

    true
  end
end

class User::Update < Trailblazer::Operation
  class Form < Reform::Form
    property :id
    property :first_name
    property :last_name
    property :email
    property :avatar
    property :admin
    property :department_ids, virtual: true

    # 共通化できそう
    validates :email, VH[:required, :email]
    validates_uniqueness_of :email
    validates :first_name, VH[:required, :middle_text_field]
    validates :last_name, VH[:required, :middle_text_field]

    validates :admin, VH[:boolean]

    # validates :department_ids, VH[:required]
    # validate -> {
    #   if department_ids.all?(&:nil?)
    #     errors.add(:department_ids, :blank)
    #   end
    # }
    # validate -> {
    #   departments = Department.where(id: department_ids)
    #   unless departments.all? {|d| d.organization_id == current_user.organization.id }
    #     errors.add(:department_ids, :must_be_same_organization)
    #   end
    # }
  end

  step Model(User, :find_by)
  step Policy::Pundit(UserPolicy, :update?)
  step Contract::Build(constant: Form, builder: :contract_with_current_user!)
  step Contract::Validate()
  step Contract::Persist(method: :sync)
  step :update
  step :check_exist_departments

  def update(_options, model:, params:, current_user:, **)
    ApplicationRecord.transaction do
      model.save(validate: false)

      departments = current_user.organization.departments.where(id: params[:department_ids])
      departments.each do |department|
        model.department_members.create!(department: department, role: :member)
      end
    end
  end

  def check_exist_departments(_options, model:, params:, current_user:, **)
    # TODO current_userが何かしらの部署に所属していることを検証する
    # でもここでエラーにしてもデータの Rollback が出来ないから、 update の中でやるほうがいいかも
    true
  end

  def contract_with_current_user!(_options, constant:, model:, current_user:, **)
    constant.new(model, current_user: current_user)
  end
end

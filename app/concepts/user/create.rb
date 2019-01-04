class User::Create < Trailblazer::Operation
  class Form < Reform::Form
    property :current_user, virtual: true

    property :first_name
    property :last_name
    property :email
    property :admin
    property :skip_notification
    property :department_ids, virtual: true

    include UserValidation.new(:default, :department_ids)
    validates :skip_notification, VH[:boolean]
    # TODO: フロントエンド側が未対応のためdepartment_idsの必須チェックをするとユーザが作成出来なくなる
    # そのためフロントエンドが対応次第下記コメントアウトを有効にする
    # validates :department_ids, VH[:required]
  end

  step Model(User, :new)
  step Policy::Pundit(UserPolicy, :create?)
  step Contract::Build(constant: Form, builder: ContractWithCurrentUser)
  step Contract::Validate()
  step Contract::Persist(method: :sync)
  step :create

  def create(_options, model:, params:, current_user:, **)
    current_organization = current_user.organization

    # TODO Userのbefore_create/after_createの処理をここに移動したいが、
    # ここ以外でもUserを作成するケースがありそう(現状では他のユーザーが
    # 存在していないとこのクラスを使うことが出来ない)であるため、
    # 影響範囲が明白になってから対応したい
    ApplicationRecord.transaction do
      model.organization = current_organization
      model.save(validate: false)

      departments = current_organization.departments.where(id: params[:department_ids])
      departments.each do |department|
        model.department_members.create!(department: department, role: :member)
      end
    end

    true
  end
end

class Department::Create < Trailblazer::Operation
  class Form < Reform::Form
    property :name
    property :display_order
    property :organization_id  # TODO 面倒だったら別の区分に分ける
    property :owner_id, virtual: true
    property :parent_department_id, virtual: true

    validates :name, presence: true
    validates :display_order, presence: true
    validates :organization_id, presence: true
    validates :owner_id, presence: true
    validate -> {
      unless OrganizationMember.find_by(organization_id: organization_id, user_id: owner_id)
        errors.add(:owner_id, "は組織内のユーザーにしてください")
      end
    }
  end

  step Model(Department, :new)
  step Contract::Build(constant: Form)
  step Contract::Validate()
  step Contract::Persist(method: :sync)
  step :save_attributes

  def save_attributes(options, metadata)



    department = options[:model]

    # TODO transaction が失敗した時の処理を RailWay でできる？
    ApplicationRecord.transaction do
      if options[:params][:parent_department_id]
        department.parent = Department.find(options[:params][:parent_department_id])
      end
      department.save!

      owner = User.find(options[:params][:owner_id])
      department.create_department_members_owner!(user: owner)
      true
    end
  end
end

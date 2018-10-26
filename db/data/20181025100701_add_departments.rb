# frozen_string_literal: true

class AddDepartments < ActiveRecord::Migration[5.2]
  using LoudApplicationRecord

  def up
    ApplicationRecord.transaction do
      Organization.includes(organization_members: :user, okr_periods: :objectives).find_each do |org|
        # Organizationにdefault部署を作成
        department = Department.create_default!(organization: org)

        # Organizationの代表者をdefault部署の部署責任者にする
        org_owner = org.organization_members.find(&:owner?).user
        DepartmentMember.create!(
          department: department,
          user: org_owner,
          role: :owner
        )

        # Organizationのメンバーを全員部署に紐付ける
        org_members = org.organization_members.select(&:member?).map(&:user)
        org_members.each do |org_member|
          DepartmentMember.create!(
            department: department,
            user: org_member,
            role: :member
          )
        end

        # Organizationに紐付く全てのObjectivesをdefault部署に紐付ける
        objectives = org.okr_periods.map(&:objectives).flatten
        objectives.each do |objective|
          DepartmentObjective.create!(
            department: department,
            objective: objective
          )
        end
      end
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end

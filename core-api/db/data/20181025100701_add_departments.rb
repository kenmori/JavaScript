# frozen_string_literal: true

class AddDepartments < ActiveRecord::Migration[5.2]
  using LoudApplicationRecord

  def up
    ApplicationRecord.transaction do
      Organization.includes(organization_members: :user, okr_periods: :objectives).find_each do |org|
        # Organizationの代表者をdefault部署の部署責任者にする
        org_owner = org.organization_members.find(&:owner?).user

        # Organizationにdefault部署を作成
        result = Department::CreateDefault.call(params: {organization_id: org.id, owner_id: org_owner.id}, current_user: org_owner)
        department = result[:model]

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
    ApplicationRecord.transaction do
      DepartmentObjective.destroy_all
      DepartmentMember.destroy_all
      Department.destroy_all
    end
  end
end

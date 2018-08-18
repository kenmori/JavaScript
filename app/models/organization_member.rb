class OrganizationMember < ApplicationRecord
  belongs_to :organization
  belongs_to :user

  enum role: { owner: 0, member: 1 }

  before_create do
    self.role = :owner unless organization.organization_members.exists? # 最初のユーザーを代表者にする
  end
end

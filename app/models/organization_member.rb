class OrganizationMember < ApplicationRecord
  belongs_to :organization
  belongs_to :user

  after_destroy do
    # 組織に所属していないユーザーは削除する
    user.destroy! if user.organizations.empty?
  end
end

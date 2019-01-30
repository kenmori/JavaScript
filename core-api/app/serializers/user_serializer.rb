class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :is_confirming, :is_admin, :avatar_url, :disabled, :sign_in_at

  def avatar_url
    object.avatar.url
  end

  def email
    object.unconfirmed_email || object.email
  end

  def is_confirming
    !object.confirmed? || object.unconfirmed_email
  end

  def is_admin
    object.admin?
  end
end

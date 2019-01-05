# frozen_string_literal: true

json.extract! user, :id, :first_name, :last_name, :avatar_url, :disabled, :sign_in_at
json.departments do
  json.partial! "departments/department", collection: user.departments, as: :department
end

json.email user.unconfirmed_email || user.email

json.is_confirming !user.confirmed? || user.unconfirmed_email

json.is_admin user.admin?

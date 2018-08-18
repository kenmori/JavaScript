json.extract! user, :id, :first_name, :last_name, :avatar_url, :disabled, :sign_in_at

json.email user.unconfirmed_email || user.email

json.is_confirming !user.confirmed? || user.unconfirmed_email

json.is_admin user.admin?
